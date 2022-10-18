import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewPasswordService {

  url = environment.baseUrl
  constructor(private http:HttpClient) { }



        getAllOtp(){
        //taking userid and otp form url

          // let url="http://localhost:8081/api/getAllOtp"
          // return this.http.get(url)
        }



      updatePasswordInDb(forgetPassword){
      //  console.log(forgetPassword)

        // const headers = new HttpHeaders().set("Access-Control-Allow-Origin","*");
        return this.http.put(this.url+"/api/updatePassword",forgetPassword);
      }

}
