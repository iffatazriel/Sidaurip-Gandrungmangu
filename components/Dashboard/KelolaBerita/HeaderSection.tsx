import React from "react";

export default function HeaderSection() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-extrabold headline-font text-primary tracking-tight mb-2">
            Berita Desa
          </h2>
          <p className="text-on-surface-variant font-medium">
            Manage and publish official village news and announcements.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary-container text-on-primary px-6 py-3 rounded-xl font-bold active:scale-95 transition-transform shadow-lg shadow-primary-container/20">
          <span className="material-symbols-outlined" data-icon="add">
            add
          </span>
          New Entry
        </button>
      </div>
      {/* Stats Bar (Asymmetric Component)  */}
      <div className="grid grid-cols-12 gap-6 mb-10">
        <div className="col-span-12 md:col-span-8 grid grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border-l-4 border-primary">
            <p className="text-xs font-bold text-outline uppercase tracking-widest mb-1">
              Total Posts
            </p>
            <h3 className="text-3xl font-bold headline-font text-primary">
              124
            </h3>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border-l-4 border-secondary">
            <p className="text-xs font-bold text-outline uppercase tracking-widest mb-1">
              Published
            </p>
            <h3 className="text-3xl font-bold headline-font text-secondary">
              118
            </h3>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border-l-4 border-tertiary-container">
            <p className="text-xs font-bold text-outline uppercase tracking-widest mb-1">
              Drafts
            </p>
            <h3 className="text-3xl font-bold headline-font text-tertiary-container">
              6
            </h3>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 bg-primary-container p-6 rounded-2xl text-on-primary flex items-center justify-between overflow-hidden relative">
          <div className="z-10">
            <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">
              Storage Usage
            </p>
            <h3 className="text-3xl font-bold headline-font">42%</h3>
          </div>
          <span
            className="material-symbols-outlined text-8xl absolute -right-4 -bottom-4 opacity-10"
            data-icon="cloud_queue"
          >
            cloud_queue
          </span>
        </div>
      </div>
    </div>
  );
}
