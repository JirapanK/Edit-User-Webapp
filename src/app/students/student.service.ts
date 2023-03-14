import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/ui-models/student.model';
import { AddStudentRequest } from '../models/api-models/add-student-request.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://dev.tks.co.th/studentapi';

  constructor(private httpClient: HttpClient) { }

  getStudents():Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseApiUrl+'/students');
  }
  getStudent(studentId:string): Observable<Student>{
  return this.httpClient.get<Student>(this.baseApiUrl+'/students/'+studentId)
  }

  getImagePath(relativePath:string){
    return `${this.baseApiUrl}/${relativePath}`;
  }

  addStudent(studentRequest: Student): Observable<Student> {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    };

    return this.httpClient.post<Student>(this.baseApiUrl + '/students/add', addStudentRequest);
  }

  updateStudent(studentId: string, studentRequest: Student): Observable<Student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    }

    return this.httpClient.put<Student>(this.baseApiUrl + '/students/' + studentId, updateStudentRequest);
  }
  
  deleteStudent(studentId: string): Observable<Student> {
    return this.httpClient.delete<Student>(this.baseApiUrl + '/students/' + studentId);
  }

  uploadImage(studentId:string,file:File):Observable<any>{
    const formData = new FormData();
    formData.append("profileImage",file);
    return this.httpClient.post(this.baseApiUrl + '/students/' + studentId + '/upload-image' ,formData,{responseType:'text'})
  }
}
