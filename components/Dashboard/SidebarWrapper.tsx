"use client";

import { ReactNode, useState } from "react";

export default function SidebarWrapper({
  sidebar,
  header,
  children,
}: {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-primary/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <HeaderWithToggle header={header} onToggle={() => setSidebarOpen((p) => !p)} />
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
}

function HeaderWithToggle({
  header,
  onToggle,
}: {
  header: ReactNode;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
        title="Toggle sidebar"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
      {header}
    </div>
  );
}
