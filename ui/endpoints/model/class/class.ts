export interface ClassModel {
id: number;
  class_code: string;
  class_name: string;
  academic_year: string;
  period: string;
  room: string;
  max_capacity: number;
  teacher_id?: number;
  status: string;

}