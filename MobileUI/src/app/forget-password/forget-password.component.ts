import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ForgetPasswordServiceService } from './forget-password-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  
    
  constructor( private ForgetPasswordServiceService:ForgetPasswordServiceService
    
    ) {
   }

  ngOnInit(): void {
   
   
  }

  form = new FormGroup({
    email : new FormControl(),
  
  })


    sendOtp(form: any){

      // debugger;
     console.log(form.email)
    this.ForgetPasswordServiceService.sendingOtp(form.email).subscribe(data=>{
      console.log(data)
        return data;
    })
    }

}
