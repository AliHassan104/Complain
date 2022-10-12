import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollingquestionService } from '../Services/pollingquestion.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-pollingquestion',
  templateUrl: './pollingquestion.component.html',
  styleUrls: ['./pollingquestion.component.css']
})
export class PollingquestionComponent implements OnInit {

  constructor(private activateRoute : ActivatedRoute ,
               private pollingQuestion : PollingquestionService,
               private userService : UserService
               ) {
    const id = this.activateRoute.snapshot.params['id']

    // this.achievementService.getAchievementById(id)
   }

  ngOnInit(): void {
    // this.getPollingQuestion()
    this.getUser()
  }

  lists : any = []
  areaName : any

  // getPollingQuestion() {
  //   this.pollingQuestion.getAllPollingQuestion().subscribe(data => {
  //     this.lists = data
  //     console.log(data);
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // getPollingQuestionByArea(area : any) {
  //   this.pollingQuestion.getPollingQuestionByArea(area).subscribe(data => {
  //     this.lists = data
  //     // console.log(data);
  //   }, error => {
  //     console.log(error);
  //   });
  // }
  getPollingQuestionNotAnswered(area : any) {
    this.pollingQuestion.getPollingQuestionNotAnswered().subscribe(data => {
      this.lists = data
    }, error => {
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
    this.areaName = user.area.name

    // this.getPollingQuestionByArea(user.area.id)
    this.getPollingQuestionNotAnswered(user.id)
  }, error => {
  });
}


}



