import { z } from 'zod';

// NIK validation (must be exactly 16 digits)
const nikSchema = z
  .string()
  .min(1, 'NIK wajib diisi')
  .regex(/^\d{16}$/, 'NIK harus 16 digit angka');

// Phone validation (Indonesian format)
const phoneSchema = z
  .string()
  .regex(/^(\+62|62|0)[0-9]{9,12}$/, 'Format nomor HP tidak valid')
  .optional()
  .or(z.literal(''));

// Resident form validation schema
export const residentFormSchema = z.object({
  nama: z
    .string()
    .min(1, 'Nama wajib diisi')
    .min(3, 'Nama minimal 3 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  
  nik: nikSchema,
  
  jenisKelamin: z.enum(['LAKI-LAKI', 'PEREMPUAN']),
  
  tempatLahir: z
    .string()
    .max(50, 'Tempat lahir maksimal 50 karakter')
    .optional()
    .or(z.literal('')),
  
  tanggalLahir: z
    .string()
    .optional()
    .or(z.literal('')),
  
  agama: z
    .string()
    .optional()
    .or(z.literal('')),
  
  alamat: z
    .string()
    .min(1, 'Alamat wajib diisi')
    .min(10, 'Alamat minimal 10 karakter')
    .max(200, 'Alamat maksimal 200 karakter'),
  
  rt: z
    .string()
    .regex(/^\d{0,3}$/, 'RT harus berupa angka maksimal 3 digit')
    .optional()
    .or(z.literal('')),
  
  rw: z
    .string()
    .regex(/^\d{0,3}$/, 'RW harus berupa angka maksimal 3 digit')
    .optional()
    .or(z.literal('')),
  
  dusun: z
    .string()
    .max(50, 'Dusun maksimal 50 karakter')
    .optional()
    .or(z.literal('')),
  
  pekerjaan: z
    .string()
    .max(50, 'Pekerjaan maksimal 50 karakter')
    .optional()
    .or(z.literal('')),
  
  pendidikan: z
    .string()
    .optional()
    .or(z.literal('')),
  
  statusKawin: z
    .string()
    .optional()
    .or(z.literal('')),
  
  noKK: z
    .string()
    .regex(/^(\d{16})?$/, 'No. KK harus 16 digit angka')
    .optional()
    .or(z.literal('')),
  
  status: z.enum(['AKTIF', 'PINDAH', 'MENINGGAL']),
});

// Login form validation schema
export const loginFormSchema = z.object({
  nik: nikSchema,
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(8, 'Password minimal 8 karakter')
    .max(100, 'Password maksimal 100 karakter'),
});

// Register form validation schema
export const registerFormSchema = z.object({
  nik: nikSchema,
  name: z
    .string()
    .min(1, 'Nama wajib diisi')
    .min(3, 'Nama minimal 3 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  phone: phoneSchema,
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(8, 'Password minimal 8 karakter')
    .max(100, 'Password maksimal 100 karakter')
    .regex(/[A-Z]/, 'Password harus mengandung minimal 1 huruf besar')
    .regex(/[a-z]/, 'Password harus mengandung minimal 1 huruf kecil')
    .regex(/[0-9]/, 'Password harus mengandung minimal 1 angka'),
});

// Service request form validation schema
export const serviceRequestSchema = z.object({
  serviceType: z.string().min(1, 'Pilih jenis layanan'),
  applicantName: z.string().min(1, 'Nama pemohon wajib diisi'),
  nik: nikSchema,
  phone: phoneSchema,
  address: z.string().optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
});

// File upload validation
export const fileUploadSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama dokumen wajib diisi')
    .max(100, 'Nama dokumen maksimal 100 karakter'),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Ukuran file maksimal 5MB')
    .refine(
      (file) => ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
      'Format file harus PDF, JPG, atau PNG'
    ),
});

// Type exports
export type ResidentFormData = z.infer<typeof residentFormSchema>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;
export type ServiceRequestData = z.infer<typeof serviceRequestSchema>;
export type FileUploadData = z.infer<typeof fileUploadSchema>;

// Input sanitization utilities
export function sanitizeInput(value: string): string {
  return value
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function sanitizeNIK(value: string): string {
  return value.replace(/\D/g, '').slice(0, 16);
}

export function sanitizePhone(value: string): string {
  return value.replace(/[^0-9+]/g, '');
}
