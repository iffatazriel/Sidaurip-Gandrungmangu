import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-outline-variant bg-surface-container-lowest/90 shadow-sm shadow-primary/5 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between px-8 py-3">
        <div className="flex items-center gap-8">
          <h2 className="font-headline text-xl font-bold uppercase tracking-wider text-primary">
            CIVIC SANCTUARY CONSOLE
          </h2>
          <div className="hidden w-96 items-center rounded-full bg-surface-container-low px-4 py-2 lg:flex">
            <span className="material-symbols-outlined mr-2 text-on-surface-variant">
              search
            </span>
            <input
              className="w-full border-none bg-transparent p-0 text-sm text-on-surface placeholder:text-on-surface-variant focus:ring-0"
              placeholder="Search records, news, or reports..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary active:scale-95">
              <span
                className="material-symbols-outlined"
                data-icon="notifications"
              >
                notifications
              </span>
            </button>
            <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary active:scale-95">
              <span className="material-symbols-outlined" data-icon="mail">
                mail
              </span>
            </button>
            <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary active:scale-95">
              <span className="material-symbols-outlined" data-icon="help">
                help
              </span>
            </button>
          </div>
          <div className="mx-2 h-8 w-px bg-outline-variant"></div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-primary">Admin Utama</p>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                Super Administrator
              </p>
            </div>
            <Image
              alt="Administrator Profile"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/10"
              data-alt="portrait of a professional male administrator in his 40s wearing a clean white shirt with soft studio lighting"
              height={40}
              sizes="40px"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNJY-_x907FNyUNMtzOoYZNscJgdCqSewX34UPtk9oTjuFUMUdkIfWQSSWYU13VOQMwIyYGWh_YglU3iIi5rcNeAvkgUz8ftXwidjGrlIgRPOzJtA6tSKmETrhOaWKNJKeb7-JRf89JxiPbA0WpNE04MkWoc3XpEaw-YB8oxu6VYKnY81A97b0_vVS0BkKC0oFkg_vji6HXoJ1KZI3lkq-g6muiMIJbGwa6JkFEYyzL6zifflgog_KTD1lHrFE8Mjk0_b7JWNhHA"
              width={40}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
