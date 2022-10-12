import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = environment.baseUrl

  getToken() {
    let token = localStorage.getItem("jwtToken")
    if(token != null){
        // console.log("Bearer "+token);
        return "Bearer "+token
    }
    return null;
  }

// decodeJwtToken(token: string) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload);
// };

// getEmailByToken(){
//   let  encodedToken = this.decodeJwtToken(this.getToken())
//   return encodedToken.sub;
// }

  getUser() {
    return this.http.get(`${this.url}/api/get-logged-in-user`)
  }


}
