import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(){
    this.getToken()
    if (this.getToken() != null) {
      return  true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }

    getToken() {
    let token = localStorage.getItem("jwtToken")
    if(token != null){
        return "Bearer "+token
    }
    return null;
}

}
