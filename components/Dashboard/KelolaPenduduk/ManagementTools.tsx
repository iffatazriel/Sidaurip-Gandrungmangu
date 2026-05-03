export default function ManagementTools() {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div>
        <h2 className="font-headline mb-2 text-3xl font-bold text-primary-container">
          Resident Registry
        </h2>
        <p className="max-w-md text-sm text-on-surface-variant">
          Manage official residency data including NIK verification, address
          mapping, and status tracking for the village population.
        </p>
      </div>
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg bg-primary-container px-6 py-3 font-bold text-white shadow-lg shadow-blue-900/20 transition-transform hover:scale-[0.98]"
      >
        <span className="material-symbols-outlined">person_add</span>
        Add Resident
      </button>
    </div>
  );
}
