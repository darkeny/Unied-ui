import type { IApiResponse } from "../../interfaces/api/iApiResponse";
import type { StudentModel } from "../../model/student/studentModel";
import StudentRepository from "../../repo/student/studentRepository";

export class StudentController extends StudentRepository {
  data: IApiResponse<StudentModel[]> | null = null;
  async readByIdStudents(id: number) {
    this.data = await this.readById(id);
  }
  async readAllStudents() {
    this.data = await this.readAll();
  }

  async createStudent(student: StudentModel) {
    this.data = await this.create(student);
  }
  async updateStudent(student: StudentModel) {
    this.data = await this.update(student);
  }
  async deleteStudent(idStudent: number) {
    this.data = await this.delete(idStudent);
  }
}
