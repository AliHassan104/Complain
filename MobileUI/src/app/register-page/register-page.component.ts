import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Register } from './register';
// import { MainService } from '../Services/main.service';
import { ToastUtilService } from '../Services/toast-util.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../Services/register.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  // registerObj: Register = new Register();
  innerHeight: number = window.innerHeight - 100;
  // checked = false;
  // confirmPassword;
  // typeChange = "password";
  constructor(
    private router:Router,
    private toastService:ToastUtilService,
    private registerService : RegisterService,
    ) { }

  ngOnInit(): void {
    this.getAreas()
  }

  goToLogin(){
    this.router.navigate([""]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerHeight = window.innerHeight - 100;
  // console.log("height",this.innerHeight);
}

// onChecked(){
//   this.checked = !this.checked;
// }

// onToggleShowPassword(){
//   if(this.typeChange === "password"){
//     this.typeChange = "text"
//   }
//   else if(this.typeChange === "text"){
//     this.typeChange = "password"
//   }
// }


// registerForm:FormGroup;




registerForm = new FormGroup({

  area : new FormGroup({
    id : new FormControl(null,[ Validators.required])
  }),
  block : new FormGroup(
    {id : new FormControl(null,[ Validators.required])
  }),

  firstname : new FormControl('',[ Validators.required , Validators.minLength(3) , Validators.pattern("[a-zA-Z]*")]), // ,Validators.minLength(3) , Validators.maxLength(15)
  lastname : new FormControl('',[ Validators.required , Validators.minLength(3) , Validators.pattern("[a-zA-Z]*")]), // ,Validators.minLength(3) , Validators.maxLength(15)]
  // cnic : new FormControl('',[ Validators.required , Validators.pattern('/^([0-9]{5})[\-]([0-9]{7})[\-]([0-9]{1})+/')]), // ,Validators.minLength(9)]
  cnic : new FormControl('',[ Validators.required , Validators.pattern('^[0-9]{13}$')]), // ,Validators.minLength(9)]
  phoneNumber : new FormControl('',[ Validators.required, Validators.pattern('^[0-9]{11}$')]), // ,Validators.minLength(10) , Validators.maxLength(10)]
  email : new FormControl('',[ Validators.required , Validators.email]), // , Validators.email
  password : new FormControl('',[ Validators.required , Validators.minLength(8)]),
  numberOfFamilyMembers : new FormControl('',[ Validators.required]), // Validators.pattern('^[1-9][0-9]{2}$')
  property : new FormControl(null,[ Validators.required]),
  userType : new FormControl(),
  status : new FormControl(),
  deviceToken : new FormControl(),
  address : new FormGroup({
    // id : new FormControl()
    houseNumber : new FormControl('',[ Validators.required]),
    floorNumber : new FormControl(null,[ Validators.required]),
    // street : new FormControl('',[ Validators.required])
  }),

})






  areas : any
  blocks : any

  getAreas() {
    this.registerService.getAllArea().subscribe(data => {
      this.areas = data
    }, error => {
    });
  }

  getBlock() {
    const id = this.registerForm.value.area.id
    this.registerService.getAllBlock(id).subscribe(data => {
      this.blocks = data
      // console.log(data);
    }, error => {
      // console.log(error);
    });
  }

  userSubmit(userData: any){

    this.registerForm.value.userType = "Customer"
    this.registerForm.value.status = "IN_REVIEW"
    this.registerForm.value.deviceToken = localStorage.getItem("deviceId")

    this.userPost(this.registerForm)

  }

  userPost(data: any){
    // setTimeout(() => {
      // console.log(123);

      // console.log(data.value);

      this.registerService.postUser(data.value).subscribe(userData => {
        this.toastService.showToast("Registered Successfully Your Account Will Be Active With In 24 Hours", "#toast-15")
        this.router.navigate(['register-pending']);
      }, error => {
        this.toastService.showToast(error.error[0].message, "#toast-16");
      });
  }

}
