import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessagingService } from './messaging.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient , private token : MessagingService) { }

  checkUserandPass(name: string, pwd: string):Observable <any> {
    let user = {
      username:name,
      password:pwd
    }

    return this.http.post(environment.baseUrl+"token/generate-token",user);
  }
  url = environment.baseUrl

  Login(data):Observable <any> {
    return this.http.post(`${this.url}/api/login`,data);
  }

  setFireBaseToken(id,obj):Observable<any>{
    return this.http.put(environment.baseUrl+"token/set-firebase-token/"+id,obj);
  }

}
