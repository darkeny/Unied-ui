import axios from "axios";
import { URLBASE } from "../../helpers/constants/urls";
import type { StudentModel } from "../../model/student/studentModel";
import type { IApiResponse } from "../../interfaces/api/iApiResponse";
import type { IRepository } from "../../interfaces/iRepository/iRepository";
export default class StudentRepository implements IRepository<StudentModel> {

uri = "/students";

 async readById(id:number): Promise<IApiResponse<StudentModel[]>> {
try {
      const request = await axios.get(URLBASE + this.uri+"/"+id.toString());
      const response: IApiResponse<StudentModel[]> = {
        status: 200,
        message: "Success",
        isError: false,
        data: {
          data: [request.data],
          currentPage: 0,
          pageSize: 0,
          totalItems: 0,
          totalPages: 0,
        },
      };
      console.log("response", response);
      return response;
    } catch (error) {
      const response: IApiResponse<StudentModel[]> = {
        status: 404,
        message: "Error -" + error,
        isError: true,
        data:null,
      };
      return response;
    }
  }
  async readAll(): Promise<IApiResponse<StudentModel[]>> {
    try {
      const request = await axios.get(URLBASE + this.uri);
      const response: IApiResponse<StudentModel[]> = {
        status: 200,
        message: "Success",
        isError: false,
        data: {
          data: request.data,
          currentPage: 0,
          pageSize: 0,
          totalItems: 0,
          totalPages: 0,
        },
      };
      console.log("response", response);
      return response;
    } catch (error) {
      const response: IApiResponse<StudentModel[]> = {
        status: 404,
        message: "Error -" + error,
        isError: true,
        data: [],
      };
      return response;
    }
  }

  async create(student: StudentModel): Promise<IApiResponse<StudentModel[]>> {
    try {
      const request = await axios.post(URLBASE + this.uri+"/"+student.id.toString(), student);
      const response: IApiResponse<StudentModel[]> = {
        status: 201,
        message: "Success",
        isError: false,
        data: {
          data: [],
          currentPage: 0,
          pageSize: 0,
          totalItems: 0,
          totalPages: 0,
        },
      };
      console.log("Status", request.status);
      return response;
    } catch (error) {
      const response: IApiResponse<StudentModel[]> = {
        status: 404,
        message: "Error -" + error,
        isError: true,
        data: [],
      };
      console.log("Status", response);

      return response;
    }
  }

   async update(student: StudentModel): Promise<IApiResponse<StudentModel[]>> {

  try {

      const request = await axios.put(URLBASE + this.uri+"/"+student.id.toString(), student);

      const response: IApiResponse<StudentModel[]> = {
        status: 200,
        message: "Success",
        isError: false,
        data: {
          data: [],
          currentPage: 0,
          pageSize: 0,
          totalItems: 0,
          totalPages: 0,
        },
      };
      console.log("Status", request.status);
      return response;
    } catch (error) {
      const response: IApiResponse<StudentModel[]> = {
        status: 404,
        message: "Error -" + error,
        isError: true,
        data: [],
      };
      console.log("Status", response);

      return response;
    }
  }
 async delete(id: number): Promise<IApiResponse<StudentModel[]>> {

  try {

      const request = await axios.delete(URLBASE + this.uri+"/"+id.toString());

      const response: IApiResponse<StudentModel[]> = {
        status: 200,
        message: "Success",
        isError: false,
        data: {
          data: [],
          currentPage: 0,
          pageSize: 0,
          totalItems: 0,
          totalPages: 0,
        },
      };
      console.log("Status", request.status);
      return response;
    } catch (error) {
      const response: IApiResponse<StudentModel[]> = {
        status: 404,
        message: "Error -" + error,
        isError: true,
        data: [],
      };
      console.log("Status", response);

      return response;
    }
  }
}
