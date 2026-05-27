import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const tools = [
  { label: "B", title: "Bold", style: "font-bold", before: "**", after: "**" },
  { label: "I", title: "Italic", style: "italic", before: "*", after: "*" },
  { label: "U", title: "Underline", style: "underline", before: "<u>", after: "</u>" },
];

function applyWrap(el, before, after, onChange) {
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const selected = el.value.substring(start, end);
  const next = el.value.substring(0, start) + before + selected + after + el.value.substring(end);
  onChange(next);
  setTimeout(() => {
    el.focus();
    el.setSelectionRange(start + before.length, end + before.length);
  }, 0);
}

function applyBullet(el, onChange) {
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const value = el.value;
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const chunk = value.substring(lineStart, end);
  const prefixed = chunk
    .split("\n")
    .map((line) => (line.startsWith("- ") ? line : "- " + line))
    .join("\n");
  const next = value.substring(0, lineStart) + prefixed + value.substring(end);
  onChange(next);
  setTimeout(() => {
    el.focus();
    el.setSelectionRange(lineStart, lineStart + prefixed.length);
  }, 0);
}

export default function RichTextEditor({ value, onChange, rows = 8, placeholder }) {
  const ref = useRef(null);
  const [preview, setPreview] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      {/* Top bar: tabs + formatting tools */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-2 py-1.5">
        {/* Write / Preview tabs */}
        <div className="flex">
          <button
            type="button"
            onClick={() => setPreview(false)}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
              !preview
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setPreview(true)}
            className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
              preview
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Preview
          </button>
        </div>

        {/* Formatting tools — hidden in preview */}
        {!preview && (
          <div className="flex items-center gap-1">
            {tools.map((t) => (
              <button
                key={t.label}
                type="button"
                title={t.title}
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (ref.current) applyWrap(ref.current, t.before, t.after, onChange);
                }}
                className={`flex h-7 w-7 items-center justify-center rounded text-xs text-gray-600 hover:bg-gray-200 ${t.style}`}
              >
                {t.label}
              </button>
            ))}

            <div className="mx-1 h-5 w-px bg-gray-200" />

            <button
              type="button"
              title="Bullet list"
              onMouseDown={(e) => {
                e.preventDefault();
                if (ref.current) applyBullet(ref.current, onChange);
              }}
              className="flex h-7 w-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="3" width="2" height="2" rx="1" />
                <rect x="5" y="3" width="10" height="2" rx="1" />
                <rect x="1" y="7" width="2" height="2" rx="1" />
                <rect x="5" y="7" width="10" height="2" rx="1" />
                <rect x="1" y="11" width="2" height="2" rx="1" />
                <rect x="5" y="11" width="10" height="2" rx="1" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Write mode */}
      {!preview && (
        <textarea
          ref={ref}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full resize-y bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none"
        />
      )}

      {/* Preview mode */}
      {preview && (
        <div className="min-h-30 space-y-2 bg-white px-4 py-3">
          {value.trim() ? (
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                p: ({ children }) => (
                  <p className="text-sm leading-relaxed text-gray-700">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                u: ({ children }) => <u className="underline">{children}</u>,
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="text-sm leading-relaxed text-gray-700">{children}</li>
                ),
              }}
            >
              {value}
            </ReactMarkdown>
          ) : (
            <p className="text-sm italic text-gray-400">Nothing to preview yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
