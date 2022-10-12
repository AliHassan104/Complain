import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private http: HttpClient
  constructor(private handler:HttpBackend) {
      this.http = new HttpClient(handler)
  }

  url = environment.baseUrl

  getAllArea() {
    return this.http.get(`${this.url}/api/area`)
  }
  getAllBlock(areaId: any) {
    return this.http.get(`${this.url}/api/blockByArea/${areaId}`)
  }

  postUser(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data);
    return this.http.post(`${this.url}/api/user`, body, { 'headers': headers })
  }


}
