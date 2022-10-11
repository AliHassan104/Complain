import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AchievementService } from '../Services/achievement.service';
import { EventsService } from '../Services/events.service';
import { PostService } from '../Services/post.service';
import { ToastUtilService } from '../Services/toast-util.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  SlideOptions = { items: 1, dots: true, nav: true };
  CarouselOptions = { items: 3, dots: true, nav: true };
  innerHeight: number = window.innerHeight - 100;
  Images = []
  // Images = ['https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2hSgT72r9-qYytjio_0CemGvPU5fACSXc9bGq1AQfkg&s', 'assets/img/sample/photo/d3.jpg']
  id = sessionStorage.getItem("userId");
  userAds: Array<any> = [];
  businessAds:Array<any>=[];
  @HostListener('window:resize', ['$event'])
  screenHeight=null;
  screenWidth;
  token;
  areaId: Object


  customOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private router: Router,
    private userService : UserService,
    private achievementService : AchievementService
    , private eventService : EventsService ) {
    // this.onResize();

   }
   ngOnInit(): void {
    this.getAchievements()
    // this.getEvents()
    // this.getToken()
    // this.decodeJwtToken(this.getToken())
    // this.getEmailByToken()
    this.getUser()
  }

  achievement : any = []

  // lengthOfAchievements : any
  // lengthOfAchivement(){
  //   if (this.achievement.length == null) {
  //     this.lengthOfAchievements = false
  //   }else{
  //     this.lengthOfAchievements = true
  //   }
  // }

  getAchievements() {
    this.achievementService.getAllAchievement().subscribe(data => {
      this.achievement = data
    }, error => {
      console.log(error);
    });
  }

  events : any = []

  // getEvents() {
  //   this.eventService.getAllEvent().subscribe(data => {
  //     this.events = data
  //     this.Images.push(data)
  //     // console.log(data);
  //   }, error => {
  //     console.log(error);
  //   });
  // }
  getEventsByArea() {
    this.eventService.getEventByArea(this.areaId).subscribe(data => {
      this.events = data
      this.Images.push(data)
      // console.log(data);
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
  let user : any
  const email = this.getEmailByToken()
  this.userService.getUser().subscribe(data => {
    
    user = data
    this.areaId = user.area.id

    this.getEventsByArea()
    // console.log(data);
  }, error => {
    console.log(error);
  });
}


}
