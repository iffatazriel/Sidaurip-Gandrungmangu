import Image from "next/image";

export default function ContextualInfo() {
  return (
    <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-primary-container shadow-2xl shadow-blue-900/40 lg:col-span-4">
        <Image
          alt="Administrative Office"
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover opacity-60 mix-blend-overlay"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ1ZJs4sXw27piWFwSgRwyTsB2WIugUNoj5vqebAHW54nQSZEG8EBQ-zLJxNYPi3PTtrbpoDtxj0rNXOnJ3Wbc1T2n0Vx5iPyrf7w8iIEZWtld5RAY64lJ_l5mRtXAgK57HkVq83OH-H-CDILZeSzW4lIJ4m_DIh-WFbdUcW3pMGrV5ON57Gb9rgAqiNkGJ48oGDK7H6tDXS3T62RTnMGYFlY8Oy7NkoiHKaJbRwTDLkH4z7LUytJBQt10UQpF4wQOpunMfH-mHg"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary-container via-transparent p-8">
          <span className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-primary-container">
            Administrative Tip
          </span>
          <h4 className="text-xl font-bold leading-tight text-white">
            Maintain the integrity of the Population Registry for accurate
            social aid distribution.
          </h4>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <div>
              <h5 className="mb-1 text-lg font-bold text-primary">
                Dukcapil Synced
              </h5>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Our sanctuary console is directly integrated with the national
                Dukcapil database, ensuring NIK validation happens in real-time
                with 99.9% accuracy.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-tertiary/10 text-tertiary">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield_with_heart
              </span>
            </div>
            <div>
              <h5 className="mb-1 text-lg font-bold text-primary">
                Data Privacy Protocol
              </h5>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Citizen information is encrypted using state-level protocols.
                Access is strictly audited and logged for the safety of our
                residents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
