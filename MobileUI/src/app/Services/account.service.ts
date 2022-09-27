import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  getToken() {
    let token = localStorage.getItem("jwtToken")
    if(token != null){
        // console.log("Bearer "+token);
        return "Bearer "+token
    }
    return null;
  }

}
