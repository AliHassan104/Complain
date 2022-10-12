import { Component, OnInit } from '@angular/core';
import { EventsService } from '../Services/events.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {


  constructor(private eventService : EventsService,
              private userService : UserService,
    ) {

   }

  ngOnInit(): void {
    this.getUser()
  }

  lists : any = []

  getEventsByArea(area: any) {
      this.eventService.getEventByArea(area).subscribe(data => {
        this.lists = data
      }, error => {
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
    let user: any
    this.userService.getUser().subscribe(data => {
      user = data
      this.getEventsByArea(user.area.id)
    }, error => {
    });
  }




}
