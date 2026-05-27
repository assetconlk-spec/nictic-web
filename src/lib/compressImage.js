import imageCompression from "browser-image-compression";

const PRESETS = {
  banner:  { maxSizeMB: 1,   maxWidthOrHeight: 1920, useWebWorker: true },
  gallery: { maxSizeMB: 0.8, maxWidthOrHeight: 1280, useWebWorker: true },
  slider:  { maxSizeMB: 1,   maxWidthOrHeight: 1920, useWebWorker: true },
  tour:    { maxSizeMB: 0.8, maxWidthOrHeight: 1280, useWebWorker: true },
  about:   { maxSizeMB: 0.8, maxWidthOrHeight: 1280, useWebWorker: true },
};

export async function compressImage(file, preset = "gallery") {
  const options = PRESETS[preset] ?? PRESETS.gallery;
  try {
    return await imageCompression(file, options);
  } catch {
    return file;
  }
}
