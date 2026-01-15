export interface EnrollmentModel {
  id: number;
  student_id: number;
  class_id: number;
  enrollment_date: Date;
  academic_year: string;
  enrollment_type: string;
  amount_paid: number;
  status: string;
  documents?: string;
}