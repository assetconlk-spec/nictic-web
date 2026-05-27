import { useEffect, useRef, useState, useCallback } from "react";

const IDLE_MS = 60 * 60 * 1000; // 60 minutes before warning
const WARNING_SECONDS = 60;      // 60-second countdown then logout

export function useIdleTimeout(onLogout) {
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(WARNING_SECONDS);
  const isWarning = useRef(false);
  const idleTimer = useRef(null);
  const countdownInterval = useRef(null);

  const clearAll = () => {
    clearTimeout(idleTimer.current);
    clearInterval(countdownInterval.current);
  };

  const startCountdown = useCallback(() => {
    isWarning.current = true;
    setShowWarning(true);
    let secs = WARNING_SECONDS;
    setCountdown(secs);

    countdownInterval.current = setInterval(() => {
      secs -= 1;
      setCountdown(secs);
      if (secs <= 0) {
        clearInterval(countdownInterval.current);
        onLogout();
      }
    }, 1000);
  }, [onLogout]);

  const resetTimer = useCallback(() => {
    clearAll();
    isWarning.current = false;
    setShowWarning(false);
    setCountdown(WARNING_SECONDS);
    idleTimer.current = setTimeout(startCountdown, IDLE_MS);
  }, [startCountdown]);

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    const onActivity = () => {
      if (!isWarning.current) resetTimer();
    };
    const onVisibilityChange = () => {
      // Always reset when user returns to this tab — switching tabs must never cause logout
      if (!document.hidden) resetTimer();
    };

    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));
    document.addEventListener("visibilitychange", onVisibilityChange);
    resetTimer();
    return () => {
      events.forEach((e) => window.removeEventListener(e, onActivity));
      document.removeEventListener("visibilitychange", onVisibilityChange);
      clearAll();
    };
  }, [resetTimer]);

  return { showWarning, countdown, stayLoggedIn: resetTimer };
}
