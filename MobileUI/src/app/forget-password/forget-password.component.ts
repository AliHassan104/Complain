import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgetPasswordServiceService } from './forget-password-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {



  constructor(
    private ForgetPasswordServiceService:ForgetPasswordServiceService,
    private router:Router

    ) {
   }

   goToLogin(){
    this.router.navigate([""]);
  }

  ngOnInit(): void {

  }

  form = new FormGroup({
    email : new FormControl(),
  })


    sendOtp(form: any){
    this.ForgetPasswordServiceService.sendingOtp(form.email).subscribe(data=>{
        return data;
    })
    }

}
