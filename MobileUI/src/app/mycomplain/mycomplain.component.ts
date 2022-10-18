import { DatePipe, formatDate } from '@angular/common';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MycomplainService } from '../Services/mycomplain.service';
import { ToastUtilService } from '../Services/toast-util.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-mycomplain',
  templateUrl: './mycomplain.component.html',
  styleUrls: ['./mycomplain.component.css']
})
export class MycomplainComponent implements OnInit {
  pipe: any;
  changedDate: any;


  selectedFile = null;
  userId: any
  areaId: any
  blockId: any
  userEmail: any
  userFile: File
  imageSrc:any = null

  constructor(private myComplainService: MycomplainService ,
              private userService : UserService,
              public http: HttpClient
              , private toastService: ToastUtilService,
    ) { }

  ngOnInit(): void {
    this.getUser()
    this.getComplainType()
    // this.getComplain()
    setTimeout(() => {
      this.getComplainByEmail()
    }, 500);
  }

  newComplain : boolean =  true

  newComplainBtn(){
    if (this.newComplain == false) {
      this.newComplain = true
    }else{
      this.newComplain = false
    }}

  lists : any = []

  getComplainType() {
    this.myComplainService.getAllComplainType().subscribe(data => {
      this.lists = data
    },error => {
    });
  }

  complainList:any = []

  getComplainByEmail() {
    this.myComplainService.getComplainByEmail(this.userEmail).subscribe(data => {
      this.complainList = data
    },error => {
    });
  }

  image = new FormGroup({
    pictureUrl: new FormControl()
  })

  object = new  FormGroup({
    description : new FormControl('',[ Validators.required]),
    date : new FormControl(),
    time : new FormControl(),
    user : new FormGroup({
      id : new FormControl()
    }),
    area : new FormGroup({
      id : new FormControl()
    }),
    block : new FormGroup({
      id : new FormControl()
    }),
    complainType : new FormGroup({
      id : new FormControl(null,[ Validators.required])
    }),
  })

  complainSubmit(data: any){

    // data.value
    this.object.value.date = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    this.object.value.time = formatDate(new Date(), 'hh:mm', 'en-US')
    this.object.value.user.id = this.userId
    this.object.value.area.id = this.areaId
    this.object.value.block.id = this.blockId

    var newComplain = JSON.stringify(data)
    var formData = new FormData()

    formData.append('data', newComplain);
    
    formData.append('pictureUrl', this.userFile);

    this.myComplainService.postComplain(formData).subscribe(data => {
      this.getComplainByEmail()
      this.newComplain = true
      this.postComplainLog(data)
      this.toastService.showToast("Complain Submitted", "#toast-15")

      },error => {
        this.toastService.showToast(error.error[0].message, "#toast-16");
      });


          this.object = new  FormGroup({
            description : new FormControl(),
            date : new FormControl(),
            time : new FormControl(),
            user : new FormGroup({
              id : new FormControl()
            }),
            area : new FormGroup({
              id : new FormControl()
            }),
            block : new FormGroup({
              id : new FormControl()
            }),
            complainType : new FormGroup({
              id : new FormControl()
            }),
          })


          // this.image.controls["pictureUrl"].setValue('');
          this.image = new FormGroup({
            pictureUrl: new FormControl()
          })

  }

  postComplainLog(data:any){
    let details = {
      date : data.date,
      status : data.status,
      description : 'Your complain is in Review'
    }
    this.myComplainService.postComplainLog(data.id , details).subscribe(data => {
      },error => {
      });
  }

getToken() {
    let token = localStorage.getItem("jwtToken")
    if(token != null){
        return "Bearer "+token
    }
    return null;
  }

// decodeJwtToken(token: string) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload);
// };

// getEmailByToken(){
//   let  encodedToken = this.decodeJwtToken(this.getToken())
//   return encodedToken.sub;
// }

getUser() {
  // const email = this.getEmailByToken()
  let user: any
  this.userService.getUser().subscribe(data => {

    user = data

    this.areaId = user.area.id
    this.blockId = user.block.id
    this.userId = user.id
    this.userEmail = user.email

  }, error => {
  });
}

onChange(e: any) {

  this.selectedFile = e.target.files[0];
  this.userFile = e.target.files[0];
  const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(this.userFile);

  this.image.controls["pictureUrl"].setValue(this.selectedFile);
}

}


