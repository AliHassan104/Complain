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
    // this.getEvents()
    // this.getEventsByArea()
    this.getUser()
  }

  lists : any = []

  // getEvents() {
  //   this.eventService.getAllEvent().subscribe(data => {
  //     this.lists = data
  //     console.log(data);
  //     this.checkListLength()
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  sizeOfList : boolean;
  checkListLength(){
    if (this.lists.length == 0) {
      this.sizeOfList = false;
    }else{
      this.sizeOfList = false;
    }
  }

  getEventsByArea(area: any) {
    // console.log(area);
      this.eventService.getEventByArea(area).subscribe(data => {
        this.lists = data
        // console.log(data);
        this.checkListLength()
      }, error => {
        console.log(error);
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

  decodeJwtToken(token: string) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
  };

  getEmailByToken(){
    let  encodedToken = this.decodeJwtToken(this.getToken())
    return encodedToken.sub;
  }

  getUser() {
    let user: any
    // const email = this.getEmailByToken()
    this.userService.getUser().subscribe(data => {
      // console.log(data);
      user = data
      // console.log(user);
      this.getEventsByArea(user.area.id)
      // this.getAreaByUser()
      // return data;
    }, error => {
      console.log(error);
    });
  }




}
