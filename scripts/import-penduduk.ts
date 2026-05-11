import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { prisma } from "../lib/prisma";

type ResidentCSV = {
  nama: string;
  nik: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  agama: string;
  alamat: string;
  rt: string;
  rw: string;
  dusun: string;
  pekerjaan: string;
  pendidikan: string;
  statusKawin: string;
  noKK: string;
  status: string;
};

async function main() {
  const filePath = path.join(process.cwd(), "data", "penduduk_sidaurip.csv");
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const rows = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as ResidentCSV[];

  const residents = rows.map((row) => ({
    nama: row.nama,
    nik: row.nik,
    jenisKelamin: row.jenisKelamin,
    tempatLahir: row.tempatLahir || null,
    tanggalLahir: row.tanggalLahir ? new Date(row.tanggalLahir) : null,
    agama: row.agama || null,
    alamat: row.alamat,
    rt: row.rt || null,
    rw: row.rw || null,
    dusun: row.dusun || null,
    pekerjaan: row.pekerjaan || null,
    pendidikan: row.pendidikan || null,
    statusKawin: row.statusKawin || null,
    noKK: row.noKK || null,
    status: row.status || "AKTIF",
  }));

  const result = await prisma.resident.createMany({
    data: residents,
    skipDuplicates: true,
  });

  console.log(`Import selesai. Data masuk: ${result.count}`);
}

main()
  .catch((error) => {
    console.error("Gagal import residents:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });