"use client";

import { useEffect, useCallback } from "react";

type DocPreviewFile = {
  name: string;
  fileUrl: string;
  status?: string;
};

type DocPreviewProps = {
  files: DocPreviewFile[];
  initialIndex?: number;
  onClose: () => void;
};

export default function DocPreview({ files, initialIndex = 0, onClose }: DocPreviewProps) {
  const idx = Math.min(initialIndex, files.length - 1);
  const file = files[idx];

  const isImage = file && /\.(png|jpe?g|gif|webp|svg)$/i.test(file.fileUrl);
  const isPdf = file && /\.pdf$/i.test(file.fileUrl);

  const goNext = useCallback(() => {
    if (idx < files.length - 1) window.dispatchEvent(new CustomEvent("docprev:nav", { detail: idx + 1 }));
  }, [idx, files.length]);

  const goPrev = useCallback(() => {
    if (idx > 0) window.dispatchEvent(new CustomEvent("docprev:nav", { detail: idx - 1 }));
  }, [idx]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="max-h-[95vh] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <span className="font-bold text-white">{file.name}</span>
            {file.status && <span className="ml-3 rounded-full bg-white/20 px-3 py-0.5 text-[11px] font-bold uppercase text-white">{file.status}</span>}
          </div>
          <button onClick={onClose} className="ml-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30">&times;</button>
        </div>

        {isImage ? (
          <img src={file.fileUrl} alt={file.name} className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl" />
        ) : isPdf ? (
          <iframe src={file.fileUrl} className="h-[80vh] w-full max-w-4xl rounded-xl shadow-2xl" title={file.name} />
        ) : (
          <div className="flex h-64 w-full max-w-lg items-center justify-center rounded-xl bg-white/10 text-white">
            <a href={file.fileUrl} target="_blank" rel="noreferrer" className="font-bold underline">Buka file</a>
          </div>
        )}

        {files.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-4">
            <button onClick={goPrev} disabled={idx === 0} className="rounded-xl bg-white/20 px-4 py-2 font-bold text-white disabled:opacity-30">&larr; Prev</button>
            <span className="text-sm text-white/70">{idx + 1} / {files.length}</span>
            <button onClick={goNext} disabled={idx >= files.length - 1} className="rounded-xl bg-white/20 px-4 py-2 font-bold text-white disabled:opacity-30">Next &rarr;</button>
          </div>
        )}
      </div>
    </div>
  );
}
