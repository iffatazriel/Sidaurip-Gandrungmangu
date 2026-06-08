import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse";
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

const BATCH_SIZE = 1000;

async function main() {
  const filePath = path.join(process.cwd(), "data", "penduduk_sidaurip.csv");

  const parser = fs
    .createReadStream(filePath, { encoding: "utf-8" })
    .pipe(parse({ columns: true, skip_empty_lines: true, trim: true }));

  let batch: any[] = [];
  let totalInserted = 0;
  let batchIndex = 0;

  for await (const row of parser) {
    const r = row as ResidentCSV;
    batch.push({
      nama: r.nama,
      nik: r.nik,
      jenisKelamin: r.jenisKelamin,
      tempatLahir: r.tempatLahir || null,
      tanggalLahir: r.tanggalLahir ? new Date(r.tanggalLahir) : null,
      agama: r.agama || null,
      alamat: r.alamat,
      rt: r.rt || null,
      rw: r.rw || null,
      dusun: r.dusun || null,
      pekerjaan: r.pekerjaan || null,
      pendidikan: r.pendidikan || null,
      statusKawin: r.statusKawin || null,
      noKK: r.noKK || null,
      status: r.status || "AKTIF",
    });

    if (batch.length >= BATCH_SIZE) {
      const result = await prisma.resident.createMany({
        data: batch,
        skipDuplicates: true,
      });
      totalInserted += result.count;
      batchIndex++;
      console.log(`Batch ${batchIndex}: inserted ${result.count} (total: ${totalInserted})`);
      batch = [];
    }
  }

  // Insert remaining records
  if (batch.length > 0) {
    const result = await prisma.resident.createMany({
      data: batch,
      skipDuplicates: true,
    });
    totalInserted += result.count;
    console.log(`Final batch: inserted ${result.count} (total: ${totalInserted})`);
  }

  console.log(`Import selesai. Total data masuk: ${totalInserted}`);
}

main()
  .catch((error) => {
    console.error("Gagal import residents:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
