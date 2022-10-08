import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MycomplainService {

  constructor(private http: HttpClient) {}

  // url = "http://localhost:8081"
  url = environment.baseUrl

  getAllComplainType() {
    return this.http.get(`${this.url}/api/complaintype`)
  }



  getAllComplain() {
    return this.http.get(`${this.url}/api/complain`)
  }

  getComplainByEmail(email: any){
    return this.http.get(`${this.url}/api/complain/complainbyuser`)
  }

  postComplain(data: any): Observable<any> {

   // const headers = { 'content-type': 'multipart/form-data' }
    //const body = data;
    //console.log(body);
    return this.http.post(`${this.url}/api/complain`, data) //
  }
  
  postComplainLog(id: any , data: any): Observable<any> {
    return this.http.post(`${this.url}/api/complainlog/${id}`,data) //
  }

    getAllComplainById(id: any) {
        return this.http.get(`${this.url}/api/complain/${id}`)
    }

    getComplainLogById(id: any) {
      return this.http.get(`${this.url}/api/complainlogbycomplain/${id}`)
  }





}
