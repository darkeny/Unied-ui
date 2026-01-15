export interface AttendanceModel {
  id: number;
  student_id: number;
  class_id: number;
  lesson_date: Date;
  check_in_time: string;
  check_out_time: string;
  attendance_status: string;
  notes?: string;
  teacher_id: number;
}