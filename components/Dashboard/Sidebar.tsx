import React from "react";

export default function Sidebar() {
  return (
    <aside className="sticky left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-outline-variant bg-surface-container-lowest text-sm font-medium text-on-surface">
      <div className="flex h-full flex-col gap-2 overflow-y-auto p-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary shadow-sm">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
          </div>
          <div>
            <h1 className="font-headline text-lg font-extrabold leading-tight text-primary">
              Balaidesa Digital
            </h1>
            <p className="text-xs text-on-surface-variant">
              Village Administration
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <a
            className="flex items-center gap-3 rounded-lg bg-primary-container px-4 py-3 font-bold text-on-primary shadow-sm transition-all duration-300"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              data-icon="grid_view"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              grid_view
            </span>
            Dashboard
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant transition-all duration-300 hover:translate-x-1 hover:text-primary"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              data-icon="newspaper"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              newspaper
            </span>
            News Feed
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant transition-all duration-300 hover:translate-x-1 hover:text-primary"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              data-icon="account_balance"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
            Public Services
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant transition-all duration-300 hover:translate-x-1 hover:text-primary"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              data-icon="equalizer"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              equalizer
            </span>
            Transparency
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant transition-all duration-300 hover:translate-x-1 hover:text-primary"
            href="#"
          >
            <span
              className="material-symbols-outlined"
              data-icon="group"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              group
            </span>
            Residents
          </a>
        </nav>
        <div className="mt-auto space-y-1 pt-6">
          <button className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 font-bold text-on-secondary transition-all hover:brightness-110 active:scale-95">
            <span className="material-symbols-outlined">add</span>
            New Entry
          </button>
          <a
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant transition-all duration-300 hover:translate-x-1 hover:text-primary"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="settings">
              settings
            </span>
            Settings
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 text-error transition-all duration-300 hover:translate-x-1"
            href="#"
          >
            <span className="material-symbols-outlined" data-icon="logout">
              logout
            </span>
            Log Out
          </a>
        </div>
      </div>
    </aside>
  );
}
