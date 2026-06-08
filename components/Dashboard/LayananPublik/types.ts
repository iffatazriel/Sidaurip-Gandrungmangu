export type ServiceRequestDocument = {
  id: number;
  name: string;
  fileUrl: string;
  fileName: string;
  status: string;
  note: string | null;
  uploadedAt: string;
};

export type ServiceRequest = {
  id: number;
  trackingNumber: string;
  serviceType: string;
  applicantName: string;
  nik: string;
  phone: string | null;
  address: string | null;
  notes: string | null;
  status: string;
  adminNote: string | null;
  documentNote: string | null;
  rejectionReason: string | null;
  completedAt: string | null;
  documents: ServiceRequestDocument[];
  createdAt: string;
  updatedAt: string;
};

export type ResponseShape = {
  data: ServiceRequest[];
  meta: { page: number; perPage: number; total: number; totalPages: number };
  stats: {
    pending: number;
    needDocuments: number;
    documentReview: number;
    processing: number;
    approved: number;
    done: number;
  };
};
