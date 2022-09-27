import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = environment.baseUrl

  getUserByEmail(email: any) {
    return this.http.get(`${this.url}/api/userbyemail/${email}`)
  }
 

}
