"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ContextualInfo from "./ContextualInfo";
import FiltersArea from "./FiltersArea";
import ManagementTools from "./ManagementTools";
import ResidentTable from "./ResidentTable";
import StatisticsHeader from "./StatisticsHeader";
import type {
  ResidentImportInput,
  ResidentsResponse,
  ResidentStats,
} from "./types";

const emptyStats: ResidentStats = {
  total: 0,
  active: 0,
  moved: 0,
  deceased: 0,
};

const initialResponse: ResidentsResponse = {
  data: [],
  meta: {
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 1,
    dusunOptions: [],
  },
  stats: emptyStats,
};

const headerAliases: Record<keyof ResidentImportInput, string[]> = {
  nama: ["nama", "name", "nama lengkap", "full name"],
  nik: ["nik", "no nik", "nomor nik"],
  jenisKelamin: ["jenis kelamin", "jk", "gender", "kelamin"],
  alamat: ["alamat", "address"],
  tempatLahir: ["tempat lahir", "tempat_lahir", "birth place"],
  tanggalLahir: ["tanggal lahir", "tgl lahir", "tanggal_lahir", "dob"],
  agama: ["agama", "religion"],
  rt: ["rt"],
  rw: ["rw"],
  dusun: ["dusun", "neighborhood"],
  pekerjaan: ["pekerjaan", "job"],
  pendidikan: ["pendidikan", "education"],
  statusKawin: ["status kawin", "status perkawinan", "status_kawin"],
  noKK: ["no kk", "nokk", "nomor kk", "no_kk"],
  status: ["status"],
};

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

function parseResidentCsv(csvText: string): ResidentImportInput[] {
  const lines = csvText
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter((line) => line.trim().length > 0);

  if (lines.length < 2) {
    return [];
  }

  const headers = parseCsvLine(lines[0]).map((header) =>
    header.toLowerCase().trim()
  );

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row: Partial<ResidentImportInput> = {};

    Object.entries(headerAliases).forEach(([field, aliases]) => {
      const index = headers.findIndex((header) => aliases.includes(header));
      if (index >= 0) {
        const value = values[index]?.trim();
        if (value) {
          row[field as keyof ResidentImportInput] = value;
        }
      }
    });

    return row as ResidentImportInput;
  });
}

export default function ResidentRegistry() {
  const [response, setResponse] = useState<ResidentsResponse>(initialResponse);
  const [search, setSearch] = useState("");
  const [dusun, setDusun] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryString = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      perPage: "10",
    });

    if (search.trim()) {
      params.set("search", search.trim());
    }
    if (dusun !== "ALL") {
      params.set("dusun", dusun);
    }
    if (status !== "ALL") {
      params.set("status", status);
    }

    return params.toString();
  }, [dusun, page, search, status]);

  const loadResidents = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetch(`/api/penduduk?${queryString}`, {
        cache: "no-store",
      });

      if (!result.ok) {
        throw new Error("Gagal mengambil data penduduk");
      }

      const data = (await result.json()) as ResidentsResponse;
      setResponse(data);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Gagal mengambil data penduduk"
      );
    } finally {
      setIsLoading(false);
    }
  }, [queryString]);

  useEffect(() => {
    // Data is loaded from the API whenever query parameters change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadResidents();
  }, [loadResidents]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleDusunChange = (value: string) => {
    setDusun(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleCsvImport = async (file: File) => {
    setIsImporting(true);
    setError(null);

    try {
      const csvText = await file.text();
      const residents = parseResidentCsv(csvText);

      if (residents.length === 0) {
        throw new Error("CSV kosong atau format header tidak terbaca");
      }

      const result = await fetch("/api/penduduk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ residents }),
      });

      if (!result.ok) {
        const body = (await result.json()) as { message?: string };
        throw new Error(body.message ?? "Gagal import CSV penduduk");
      }

      setPage(1);
      await loadResidents();
    } catch (importError) {
      setError(
        importError instanceof Error
          ? importError.message
          : "Gagal import CSV penduduk"
      );
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-8">
      <StatisticsHeader stats={response.stats} />
      <ManagementTools onImportCsv={handleCsvImport} isImporting={isImporting} />
      <FiltersArea
        search={search}
        dusun={dusun}
        status={status}
        dusunOptions={response.meta.dusunOptions}
        onSearchChange={handleSearchChange}
        onDusunChange={handleDusunChange}
        onStatusChange={handleStatusChange}
      />
      {error ? (
        <div className="mb-6 rounded-xl bg-error-container px-5 py-4 text-sm font-semibold text-on-error-container">
          {error}
        </div>
      ) : null}
      <ResidentTable
        residents={response.data}
        meta={response.meta}
        isLoading={isLoading}
        onPageChange={setPage}
      />
      <ContextualInfo />
    </div>
  );
}
