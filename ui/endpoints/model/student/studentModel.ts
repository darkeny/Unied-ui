export type StudentModel = {
  id: number;
  student_number: string;
  full_name: string;
  birth_date: Date;
  gender: string;
  email: string;
  phone: string;
  address: string;
  guardian_name: string;
  guardian_phone: string;
  registration_date: Date;
  status: string;
  photo?: string;

}