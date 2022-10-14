import { Component, OnInit, HostListener, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { ToastUtilService } from '../Services/toast-util.service';
// import { MainService } from '../Services/main.service';
// import { Profile } from '../profile/profile';
import * as $ from 'jquery';
import { profile } from 'console';
import { MessagingService } from '../services/messaging.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit,AfterViewChecked {
  public innerHeight: any = window.innerHeight - 100;
  // profileObj: Profile = new Profile();
  token;
  deferredPrompt: any;
  showButton = false;
  typeChange = "password";
  constructor(private router: Router,
     private loginService: LoginService
     , private toastService: ToastUtilService,
    //   private mainService: MainService,
      private messagingService: MessagingService
      ) { }

  ngAfterViewChecked(): void {

  }


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
  goToForgetPassword(){
    this.router.navigate(['forget-password']);
  }


loginSubmit(loginCredentials: any){

  this.login.value.deviceToken = localStorage.getItem("deviceId")

    this.loginService.login(this.login.value).subscribe(data => {
        if (data.jwt != null) {

          this.toastService.showToast("Login Successfully", "#toast-15")

          localStorage.setItem("jwtToken", data.jwt)

          this.router.navigate(['home'])

        }
    }, error => {
      this.toastService.showToast(error.error[0].message, "#toast-16");
    });
}

@HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }
  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
    .then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      // console.log('User accepted the A2HS prompt');
    } else {
      // console.log('User dismissed the A2HS prompt');
    }
    this.deferredPrompt = null;
  });

}
}
