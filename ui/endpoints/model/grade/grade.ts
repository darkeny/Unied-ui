export interface GradeModel {
  id: number;
  student_id: number;
  class_id: number;
  subject: string;
  period: string;
  assessment_type: string;
  grade_value: number;
  date_recorded: Date;
  teacher_id: number;
  notes?: string;
}