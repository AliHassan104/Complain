import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastUtilService } from '../Services/toast-util.service';
import { NewPasswordService } from './new-password.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  constructor(private NewPasswordService:NewPasswordService
    ,private routes:ActivatedRoute
    , private toastService:ToastUtilService) {

     }

  form = new FormGroup({
    newpassword : new FormControl(),
    confirmpassword : new FormControl(),
  })


      myArray:any = []
      i : any;
       otp1:any
       id:any
       forgetPasswordDetails:any
  ngOnInit(): void {
  //   this.id = this.routes.snapshot.paramMap.get('userId');
  //  this.otp1=this.routes.snapshot.paramMap.get('otp')
  //  console.log(this.id);
  //   console.log(this.otp1);
    this.routes.queryParams.subscribe(params=>this.id=params.userId)
    this.routes.queryParams.subscribe(params=>this.otp1=params.otp)



  }

  updatePassword(newPass:any){

    // console.log(this.id)
    // console.log(this.otp1);
    // console.log(newPass);


    this.forgetPasswordDetails={
        id: this.id,
        otp:this.otp1,
        password:newPass.newpassword
    }
        if(newPass.newpassword==newPass.confirmpassword){
this.NewPasswordService.updatePasswordInDb(this.forgetPasswordDetails).subscribe(
            data=>{
              // console.log(data)
              this.toastService.showToast("PASWORD UPDATED", "#toast-15")
            },error=>{
              this.toastService.showToast("INVALID", "#toast-16");
            }
           )
        }else{
          this.toastService.showToast("PASSWORD DIDN'T MATCH", "#toast-16");
        }




  }

        // getAllOtpFromDb(){
        //   return this.NewPasswordService.getAllOtp().subscribe((data)=>{

        //     this.myArray = data;
        //     console.log(this.myArray);

        //     return data;
        //   })

  //}

}
