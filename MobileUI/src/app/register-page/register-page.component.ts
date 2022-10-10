import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from './register';
// import { MainService } from '../Services/main.service';
import { ToastUtilService } from '../Services/toast-util.service';
import { AreaService } from '../Services/area.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../Services/register.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerObj: Register = new Register();
  innerHeight: number = window.innerHeight - 100;
  checked = false;
  confirmPassword;
  typeChange = "password";
  constructor(private router:Router,
    // private service: MainService,
    private toastService:ToastUtilService,
    private registerService : RegisterService,
    private route: ActivatedRoute ,
    ) { }

  ngOnInit(): void {
    // this.registerObj.userType = null;
    this.getAreas()
  }

  goToLogin(){
    this.router.navigate([""]);
  }

  // registerUser(){
  //   if(this.checked === false && this.registerObj.password === this.confirmPassword){
  //     this.toastService.showToast("Agree to terms and conditions first","#toast-16")
  //   }
  //   else if(this.checked && this.registerObj.password !== this.confirmPassword){
  //     this.toastService.showToast("You entered wrong password","#toast-16")
  //   }
  //   else if(this.checked === false && this.registerObj.password !== this.confirmPassword){
  //     this.toastService.showToast("You entered wrong password","#toast-16")
  //   }
  //   else if(this.checked && this.registerObj.password === this.confirmPassword){
  //   this.service.registerUser(this.registerObj).subscribe(d=>{
  //     if(d.status == 200){
  //       this.toastService.showToast("Success","#toast-15");
  //       this.emptyObj();
  //       setTimeout(()=>this.router.navigate(['']),3000);
  //     }
  //     else{
  //       this.toastService.showToast("User Already Exists","#toast-16")
  //     }

  //   })
  // }else{
  //   this.toastService.showToast("Enter all required fields","#toast-16")
  // }

  // }

  emptyValue(){
    this.registerObj.userType = null;
  }

  insertValue1(){
      this.registerObj.userType = "USER"
      console.log(this.registerObj.userType)

  }

  insertValue2(){
    this.registerObj.userType = "ADMIN"
    console.log(this.registerObj.userType)
  }

  emptyObj(){
    this.registerObj.email = null;
    this.registerObj.name = null;
    this.registerObj.password = null;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerHeight = window.innerHeight - 100;
  // console.log("height",this.innerHeight);
}

onChecked(){
  this.checked = !this.checked;
  console.log("checked ", this.checked)
}

onToggleShowPassword(){
  if(this.typeChange === "password"){
    this.typeChange = "text"
  }
  else if(this.typeChange === "text"){
    this.typeChange = "password"
  }
}


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
  phoneNumber : new FormControl('',[ Validators.required, Validators.pattern('^[0-9]{10}$')]), // ,Validators.minLength(10) , Validators.maxLength(10)]
  email : new FormControl('',[ Validators.required , Validators.email]), // , Validators.email
  password : new FormControl('',[ Validators.required , Validators.minLength(8)]),
  numberOfFamilyMembers : new FormControl('',[ Validators.required]), // Validators.pattern('^[1-9][0-9]{2}$')
  property : new FormControl(null,[ Validators.required]),
  userType : new FormControl(),
  deviceToken : new FormControl(),
  address : new FormGroup({
    // id : new FormControl()
    houseNumber : new FormControl('',[ Validators.required]),
    floorNumber : new FormControl('',[ Validators.required]),
    // street : new FormControl('',[ Validators.required])
  }),

})






// user = new FormGroup({
//   address : new FormGroup({
//     id : new FormControl()
//   }),
//   area : new FormGroup({
//     id : new FormControl()
//   }),
//   block : new FormGroup({
//     id : new FormControl()
//   }),
//   // roles : new FormGroup({
//   //   id : new FormControl()
//   // }),

//   firstname : new FormControl(),
//   lastname : new FormControl(),
//   cnic : new FormControl(),
//   phoneNumber : new FormControl(),
//   email : new FormControl(),
//   password : new FormControl(),
//   numberOfFamilyMembers : new FormControl(),
//   property : new FormControl(),
//   userType : new FormControl(),
//   deviceToken : new FormControl(),
// })


// address = new FormGroup({
//   houseNumber : new FormControl(),
//   floorNumber : new FormControl(),
//   street : new FormControl(),
// })


  areas : any
  blocks : any

  getAreas() {
    this.registerService.getAllArea().subscribe(data => {
      this.areas = data
      // console.log(data);
    }, error => {
      console.log(error);
    });
  }

  getBlock() {
    const id = this.registerForm.value.area.id
    this.registerService.getAllBlock(id).subscribe(data => {
      this.blocks = data
      // console.log(data);
    }, error => {
      console.log(error);
    });
  }

  userSubmit(userData: any){

    // this.address.value.floorNumber = userData.floorNumber
    // this.address.value.houseNumber = userData.houseNumber
    // this.address.value.street = userData.street

    // this.user.value.firstname = userData.firstname
    // this.user.value.lastname = userData.lastname
    // this.user.value.cnic = userData.cnic
    // this.user.value.phoneNumber = userData.phoneNumber
    // this.user.value.email = userData.email
    // this.user.value.password = userData.password
    // this.user.value.numberOfFamilyMembers = userData.numberOfFamilyMembers
    // this.user.value.property = userData.property
    this.registerForm.value.userType = "Customer"
    this.registerForm.value.deviceToken = localStorage.getItem("deviceId")

    // this.user.value.address.id = userData.address.id
    // this.user.value.area.id = userData.area.id
    // this.user.value.block.id = userData.block.id

    // this.registerService.postAddress(this.address.value).subscribe(addressData => {
    //     this.blocks = addressData
    //     console.log(addressData);
    //       this.user.value.address.id = 1
    //       this.userPost(this.registerForm)
    //       this.toastService.showToast("Registered Successfully Your Account Will Be Active With In 24 Hours", "#toast-15")

    //   }, error => {
    //     console.log(error);
    //     this.toastService.showToast("Not Registered", "#toast-16");
    //   });


    this.userPost(this.registerForm)

  }

  userPost(data: any){
    // setTimeout(() => {
      this.registerService.postUser(data.value).subscribe(userData => {
        this.toastService.showToast("Registered Successfully Your Account Will Be Active With In 24 Hours", "#toast-15")

        this.router.navigate(['register-pending']);
        // console.log(userData);
      }, error => {
        console.log(error);
        this.toastService.showToast("Not Registered", "#toast-16");
      });
    // }, 1500);
  }

}
