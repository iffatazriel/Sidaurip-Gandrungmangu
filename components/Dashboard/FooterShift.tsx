import React from "react";

export default function FooterShift() {
  return (
    <div>
      <footer className="mt-auto p-8 bg-surface-container-low border-t border-slate-200/50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400 font-medium">
            © 2026 Balaidesa Digital. Part of the Civic Sanctuary Initiative.
          </p>
          <div className="flex items-center gap-6">
            <a
              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
              href="#"
            >
              Compliance
            </a>
            <a
              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
              href="#"
            >
              System Health
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
