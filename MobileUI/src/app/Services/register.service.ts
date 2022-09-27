import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  url = environment.baseUrl

  getAllArea() {
    return this.http.get(`${this.url}/api/area`)
  }
  getAllBlock(areaId: any) {
    return this.http.get(`${this.url}/api/blockByArea/${areaId}`)
  }

  postAddress(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(`${this.url}/api/address`, body, { 'headers': headers })
  }

  postUser(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(`${this.url}/api/user`, body, { 'headers': headers })
  }

}
