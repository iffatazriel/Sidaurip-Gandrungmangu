import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-3 w-full border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-bold text-blue-900 dark:text-white uppercase tracking-wider font-['Plus_Jakarta_Sans']">
          Civic Sanctuary Console
        </h2>
        <div className="hidden md:flex relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-blue-900/20"
            placeholder="Search services or requests..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-full transition-colors relative">
          <span className="material-symbols-outlined" data-icon="notifications">
            notifications
          </span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-full transition-colors">
          <span className="material-symbols-outlined" data-icon="mail">
            mail
          </span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-full transition-colors">
          <span className="material-symbols-outlined" data-icon="help">
            help
          </span>
        </button>
        <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-blue-900 dark:text-blue-100">
              Admin Utama
            </p>
            <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
              Office Level 4
            </p>
          </div>
          <Image
            alt="Administrator Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-primary-container"
            data-alt="professional portrait of a confident male government administrator in a clean office setting with soft natural light"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmb1H0GQcwkLNKIdhMNAIwmdeqNQ5_2STlOCgQkUa_KQNNvgJSswKJWesYbr8UjFDMuB0z-brIDOk5hat0-PyTHEonSZHE5LJhNXe5uLaBFnYPWblFXA8fayR-3gKp9GIG491P2H9vqJXt3Do1pAusqJHjCp8iKSfT198Ac0USRUobgLCesqei7osOWChY4YH0a1aONMi7MANA7cUrPNV7p9MOxi_tOSM76tzl5bVtgUe4x80LYfiUz3oknIv9YSEB0ALBX5XMLQ"
            width={40}
            height={40}
          />
        </div>
      </div>
    </header>
  );
}
