import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordServiceService {

  url = environment.baseUrl
  constructor(private http:HttpClient) { }


 sendingOtp(email){
  const body=JSON.stringify(email)
    let url=this.url+"/api/send/otp";
    return this.http.post(url,email);
  }


}
