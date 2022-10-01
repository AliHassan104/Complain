import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { ToastUtilService } from '../Services/toast-util.service';
import { MainService } from '../Services/main.service';
import { Profile } from '../profile/profile';
import * as $ from 'jquery';
import { profile } from 'console';
import { MessagingService } from '../services/messaging.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public innerHeight: any = window.innerHeight - 100;
  profileObj: Profile = new Profile();
  token;
  typeChange = "password";
  constructor(private router: Router,
     private loginService: LoginService
     , private toastService: ToastUtilService,
    //   private mainService: MainService,
      private messagingService: MessagingService
      ) { }


  ngOnInit(): void {
    // this.checkToken();

    // this.messagingService.requestPermission()
    // this.messagingService.receiveMessage()
    // this.getToken();
  }

  login = new FormGroup({
    email : new FormControl(),
    password: new FormControl(),
    deviceToken: new FormControl(),
  })

  goToRegister() {
    this.router.navigate(['register'])
  }


loginSubmit(loginCredentials: any){
  this.login.value.deviceToken = localStorage.getItem("deviceId")
  // console.log(this.login.value);
  console.log(this.login.value);


    this.loginService.login(this.login.value).subscribe(data => {
        if (data.jwt != null) {
          console.log(data);

            localStorage.setItem("jwtToken", data.jwt)
            this.toastService.showToast("Login Successfully", "#toast-15")
            this.router.navigate(['home'])
        }
    }, error => {
      this.toastService.showToast("Wrong Email Or Password", "#toast-16");
      // console.log(error);
    });
}

}
