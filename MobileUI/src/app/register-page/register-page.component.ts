import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from './register';
import { MainService } from '../Services/main.service';
import { ToastUtilService } from '../Services/toast-util.service';
import { AreaService } from '../Services/area.service';
import { FormControl, FormGroup } from '@angular/forms';
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
    private service: MainService,
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

  registerUser(){
    if(this.checked === false && this.registerObj.password === this.confirmPassword){
      this.toastService.showToast("Agree to terms and conditions first","#toast-16")
    }
    else if(this.checked && this.registerObj.password !== this.confirmPassword){
      this.toastService.showToast("You entered wrong password","#toast-16")
    }
    else if(this.checked === false && this.registerObj.password !== this.confirmPassword){
      this.toastService.showToast("You entered wrong password","#toast-16")
    }
    else if(this.checked && this.registerObj.password === this.confirmPassword){
    this.service.registerUser(this.registerObj).subscribe(d=>{
      if(d.status == 200){
        this.toastService.showToast("Success","#toast-15");
        this.emptyObj();
        setTimeout(()=>this.router.navigate(['']),3000);
      }
      else{
        this.toastService.showToast("User Already Exists","#toast-16")
      }

    })
  }else{
    this.toastService.showToast("Enter all required fields","#toast-16")
  }

  }

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
  address : new FormGroup({
    id : new FormControl()
  }),
  area : new FormGroup({
    id : new FormControl()
  }),
  block : new FormGroup({
    id : new FormControl()
  }),

  firstname : new FormControl(),
  lastname : new FormControl(),
  cnic : new FormControl(),
  phoneNumber : new FormControl(),
  email : new FormControl(),
  password : new FormControl(),
  numberOfFamilyMembers : new FormControl(),
  property : new FormControl(),
  houseNumber : new FormControl(),
  floorNumber : new FormControl(),
  street : new FormControl()

})


user = new FormGroup({
  address : new FormGroup({
    id : new FormControl()
  }),
  area : new FormGroup({
    id : new FormControl()
  }),
  block : new FormGroup({
    id : new FormControl()
  }),
  // roles : new FormGroup({
  //   id : new FormControl()
  // }),

  firstname : new FormControl(),
  lastname : new FormControl(),
  cnic : new FormControl(),
  phoneNumber : new FormControl(),
  email : new FormControl(),
  password : new FormControl(),
  numberOfFamilyMembers : new FormControl(),
  property : new FormControl(),
  userType : new FormControl(),
})


address = new FormGroup({
  houseNumber : new FormControl(),
  floorNumber : new FormControl(),
  street : new FormControl(),
})


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

    this.address.value.floorNumber = userData.floorNumber
    this.address.value.houseNumber = userData.houseNumber
    this.address.value.street = userData.street

    this.user.value.firstname = userData.firstname
    this.user.value.lastname = userData.lastname
    this.user.value.cnic = userData.cnic
    this.user.value.phoneNumber = userData.phoneNumber
    this.user.value.email = userData.email
    this.user.value.password = userData.password
    this.user.value.numberOfFamilyMembers = userData.numberOfFamilyMembers
    this.user.value.property = userData.property
    this.user.value.userType = "Customer"

    this.user.value.address.id = userData.address.id
    this.user.value.area.id = userData.area.id
    this.user.value.block.id = userData.block.id
    // this.user.value.roles.id = 1

// admin
// address:{id: 6}
// area:{id: '1'}
// block:{id: '1'}
// cnic:"22222222222222"
// email:"Fahd@gmail.com"
// firstname:"Fahd"
// lastname:"Khan"
// numberOfFamilyMembers:"3"
// password:"password"
// phoneNumber:"22222222222222"
// property:"Owner"
// userType:"Customer"

// mobile
// {"address":{"id":1},
// "area":{"id":"1"},
// "block":{"id":"1"},
// "firstname":"muhammad",
// "lastname":"sheri",
// "cnic":"333333",
// "phoneNumber":"333333",
// "email":"sheri@gmail.com",
// "password":"password",
// "numberOfFamilyMember":"2",
// "property":"Owner",
// "userType":"Customer"}




    this.registerService.postAddress(this.address.value).subscribe(addressData => {
        this.blocks = addressData
        console.log(addressData);
          this.user.value.address.id = 1
          this.userPost(this.user)
          this.toastService.showToast("Registered Successfully Your Account Will Be Active In 24 Hours", "#toast-15")

      }, error => {
        console.log(error);
        this.toastService.showToast("Not Registered", "#toast-16");
      });


  }

  userPost(data: any){
    // console.log(data.value);
    setTimeout(() => {
      this.registerService.postUser(data.value).subscribe(userData => {
        console.log(userData);
        this.router.navigate(['survey']);
      }, error => {
        console.log(error);
      });
    }, 1500);
  }

}
