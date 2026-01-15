export interface CertificateModel {
  id: number;
  student_id: number;
  certificate_type: string;
  issue_date: Date;
  expiry_date?: Date;
  reason?: string;
  copy_number?: string;
  pdf_document?: string;
  status: string;
  signed_by?: string;
}