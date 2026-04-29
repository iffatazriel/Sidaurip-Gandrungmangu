import Image from "next/image";
import React from "react";

export default function History() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden editorial-shadow">
              <Image
                className="w-full h-full object-cover"
                alt="Sepia toned archival photograph of Indonesian village elders gathering under a large banyan tree in a traditional public square"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDGsE6A1eDXhHlGSM4ujZvJpGp0Iggw-iH52nG2q514fvVkYQYbSy758veQl5NbYq9dga55P09A3_S4mPuAOXtZaMgBXHcChCNd-znt3XMcyxXOC4TYnKH4YdkSK7y1GncrfFOk3GsVebWZuzgjn744vfJcR5NxMHXLqVRVDq283KZ4bgLvcM2UvfjKMoEyidFT_pMDZrKrRaaRp7wT_iWRydZJ8TEl39CPacwVvxValbFvFHllFnH02BkXDee_-h3_B9QSZQvgA"
                width={500}
                height={600}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-tertiary-fixed p-8 editorial-shadow hidden md:block">
              <p className="font-headline font-bold text-on-tertiary-fixed text-4xl">
                1945
              </p>
              <p className="text-on-tertiary-fixed-variant text-sm font-semibold tracking-wider">
                TAHUN BERDIRI
              </p>
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            <h2 className="font-headline text-headline-lg text-primary text-4xl font-bold mb-8 relative">
              Jejak Langkah Sejarah
              <span className="absolute -left-4 top-0 w-1 h-full bg-secondary"></span>
            </h2>
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed font-body">
              <p>
                Berawal dari sebuah pemukiman agraris di lereng pegunungan, desa
                kami tumbuh menjadi pusat komunitas yang menjunjung tinggi nilai
                gotong royong. Sejarah mencatat bahwa fondasi desa ini
                diletakkan oleh para perintis yang memimpikan sebuah tempat
                bernaung yang aman dan subur.
              </p>
              <p>
                Melalui berbagai dekade transformasi, kami tetap menjaga
                orisinalitas adat istiadat sambil beradaptasi dengan kemajuan
                teknologi modern. Inilah yang membentuk identitas unik kami
                sebagai "The Civic Sanctuary"—sebuah tempat di mana tradisi dan
                inovasi hidup berdampingan secara harmonis.
              </p>
              <div className="pt-6">
                <a
                  className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
                  href="#"
                >
                  Baca Selengkapnya
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
