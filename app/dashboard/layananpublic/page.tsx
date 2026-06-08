"use client";

import { useState } from "react";
import ServiceRequestsManager from '@/components/Dashboard/LayananPublik/ServiceRequestsManager'
import ServiceTypeManager from '@/components/Dashboard/LayananPublik/ServiceTypeManager'
import KnowledgeBaseManager from '@/components/Dashboard/LayananPublik/KnowledgeBaseManager'

const tabs = [
  { key: "requests", label: "Pengajuan" },
  { key: "types", label: "Jenis Layanan" },
  { key: "knowledge", label: "Pengetahuan" },
];

function LayananPublik() {
  const [tab, setTab] = useState("requests");

  return (
    <div>
      <div className="mb-6 flex gap-1 rounded-xl bg-surface-container-low p-1">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex-1 rounded-lg px-4 py-2 text-sm font-bold transition-colors ${tab === t.key ? "bg-primary-container text-on-primary" : "text-on-surface-variant hover:text-on-surface"}`}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === "requests" && <ServiceRequestsManager />}
      {tab === "types" && <ServiceTypeManager />}
      {tab === "knowledge" && <KnowledgeBaseManager />}
    </div>
  );
}

export default LayananPublik
