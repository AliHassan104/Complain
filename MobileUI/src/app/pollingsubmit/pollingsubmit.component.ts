import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PollingquestionService } from '../Services/pollingquestion.service';
import { ToastUtilService } from '../Services/toast-util.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-pollingsubmit',
  templateUrl: './pollingsubmit.component.html',
  styleUrls: ['./pollingsubmit.component.css']
})
export class PollingsubmitComponent implements OnInit {
  userId: any;

  constructor(private route: ActivatedRoute ,
              private pollingquestionService : PollingquestionService,
              private userService : UserService,
              private router:Router,
              private toastService: ToastUtilService,

              ) {}

  questionId: any
  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('id');
    this.questionId = id
    this.getPollingQuestion(parseInt(id))
    this.getUser()
  }


  pollingAnswer = new FormGroup({
    user : new FormGroup({
      id : new FormControl()
    }),
    pollingQuestion : new FormGroup({
      id : new FormControl()
    }),
    pollingOption : new FormGroup({
      id : new FormControl('',Validators.required)
    })
  })




  pollingquestion : any = []

  getPollingQuestion(id: number) {
    this.pollingquestionService.getPollingQuestionById(id).subscribe(data => {
      this.pollingquestion = data
    }, error => {
    });
  }

  goToSurvey(){
    this.router.navigate(['survey']);
  }


  surveySubmit(data: any ){

    this.pollingAnswer.value.pollingQuestion.id = parseInt(this.questionId)
    this.pollingAnswer.value.user.id = this.userId

    this.pollingquestionService.postPollingQuestion(data).subscribe((data) =>{

          this.toastService.showToast("Answer Submited", "#toast-15")

          this.router.navigate(['home']);

      }, error => {
          this.toastService.showToast(error.error[0].message, "#toast-16");

      });

  }

  getToken() {
    let token = localStorage.getItem("jwtToken")
    if(token != null){
        // console.log("Bearer "+token);
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
    let user: any
    // const email = this.getEmailByToken()
    this.userService.getUser().subscribe(data => {
      // console.log(data);

      user = data
      this.userId = user.id
    }, error => {
    });
  }

}
