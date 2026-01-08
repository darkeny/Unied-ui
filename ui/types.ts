
export enum UserRole {
  STUDENT = 'Aluno',
  TEACHER = 'Professor',
  PARENT = 'Encarregado de Educação',
  SECRETARY = 'Secretaria',
  PEDAGOGICAL = 'Pedagógico',
  FINANCIAL = 'Financeiro',
  SYSTEM_ADMIN = 'Administrador do Sistema'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  email?: string;
}

export interface Student {
  id: string;
  name: string;
  birthDate?: string;
  gender?: 'M' | 'F';
  address?: string;
  contacts?: string;
  classId?: string;
  className?: string;
  turn?: 'Manhã' | 'Tarde' | 'Noite';
  enrollmentStatus: 'Ativo' | 'Inscrito' | 'Pendente';
  paymentStatus: 'Regular' | 'Pendente' | 'Atrasado';
  docStatus: 'Completo' | 'Incompleto';
  parentName?: string;
  parentContact: string;
  parentAddress?: string;
  kinship?: string;
  documents?: { name: string; status: 'Validado' | 'Pendente' }[];
}

export interface PedagogicalBalance {
  id: string;
  classId: string;
  className: string;
  quarter: 1 | 2 | 3;
  teacherId: string;
  teacherName: string;
  content: string;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado';
  date: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  classes: string[];
}

export interface SchoolClass {
  id: string;
  name: string;
  year: string;
  studentsCount: number;
  teacherId?: string;
  teacherName?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  description: string;
  amount: number;
  status: 'Pago' | 'Pendente' | 'Atrasado';
  date: string;
  method?: string;
}
