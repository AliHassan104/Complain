import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
// import { MainService } from "../Services/main.service";
import { NotificationService } from "../Services/notification.service";
// import { ChatService } from "../Services/chat.service";
import { environment } from "../../environments/environment";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";
import * as moment from "moment";
import { ToastUtilService } from "../Services/toast-util.service";
import * as $ from "jquery";
import { MessagingService } from "../services/messaging.service";
import { NotificationBody } from "./notificationBody";
// import { Profile } from '../profile/profile';
import { UserService } from "../Services/user.service";

@Component({
  selector: "app-bottom-menu",
  templateUrl: "./bottom-menu.component.html",
  styleUrls: ["./bottom-menu.component.css"],
})
export class BottomMenuComponent implements OnInit , AfterViewInit{
  private stompClient;
  id = sessionStorage.getItem("userId");
  friendsArray = [];
  userName: string;
  profilePicture;
  checkStorage;
  notificationCount: number = 0;
  userType = sessionStorage.getItem("userType");
  email = sessionStorage.getItem("email");
  chatCount: number = 0;
  message;
  deferredPrompt: any;
  showButton = false;
  token: any;
  notificationObj: NotificationBody = new NotificationBody();
  reqCount: number = 0;
  // userObj: Profile = new Profile();
  // @Input("noOfNotifications") noOfNotifications:number;

  constructor(
    private messagingService: MessagingService,
    private router: Router,
    // private service: MainService,
    private notificationService: NotificationService,
    // private chatService: ChatService,
    private toastService: ToastUtilService,
    private userService: UserService
  ) {}

  ngAfterViewInit(){
    // throw new Error("Method not implemented.");
    // console.log(this.marker);
  }

  @ViewChild("dbb")marker: ElementRef




  ngOnInit(): void {
    this.getUser()
  }

  // checkUserType() {
  //   if (this.userType == "admin") return true;
  //   else return false;
  // }

  // initializeWebSocketConnection() {
  //   const url = environment.baseUrl;
  //   let ws = new SockJS(url + "ws");
  //   this.stompClient = Stomp.over(ws);
  //   let that = this;
  //   this.stompClient.connect({}, function (frame) {
  //     that.openGlobalSocketForRequestNotification();
  //     that.openGlobalSocketForPostNotification();
  //     that.goOnline();
  //   });
  // }

  // checkSessionStorage() {
  //   this.checkStorage = sessionStorage.getItem("profilePicture");
  //   if (this.checkStorage !== "null") {
  //     this.profilePicture = sessionStorage.getItem("profilePicture");
  //   }
  // }

  ngOnDestroy() {
    // if (this.stompClient) {
    //   this.goOffline();
    //   this.stompClient.unsubscribe();
    // }
  }

  closeDialogue(){
    this.marker.nativeElement.style.display = 'none'
  }

  // getAllFriends() {
  //   this.friendsArray = [];

  //   this.service.getAllFriendsAndStatus(this.id).subscribe((d) => {
  //     if (d.status == 200) {
  //       console.log(d);
  //       d.result.map((u) => {
  //         this.friendsArray.push(u);
  //       });
  //     }
  //   });
  // }

  openGlobalSocketForRequestNotification() {
    // console.log("open global socket");
    let that = this;

    this.stompClient.subscribe(`/topic/notification/${this.id}`, (message) => {
      // console.log(JSON.parse(message.body), "   =========message");
      let notificationMsg = JSON.parse(message.body).result.message;
      let notificationId = JSON.parse(message.body).result.id;
      if (JSON.parse(message.body).status == 200) {
        this.notificationService
          .seenNotification(notificationId)
          .subscribe((d) => {
            //  this.notifyMe(notificationMsg);
          });
      }
    });
  }

  openGlobalSocketForPostNotification() {
    // console.log("open global socket");
    let that = this;
    this.stompClient.subscribe(
      `/topic/post-notification/${this.id}`,
      (message) => {
        // console.log(JSON.parse(message.body), "   =========message");
        let notificationMsg = JSON.parse(message.body).result.message;
        let notificationId = JSON.parse(message.body).result.id;
        let userId = JSON.parse(message.body).result.notificationFrom.id;
        if (JSON.parse(message.body).status == 200) {
          this.notificationService
            .seenAllPostNotifications(notificationId, userId)
            .subscribe((d) => {
              //  this.notifyMe(notificationMsg);

            });

        }
      }

    );
  }

  // getAllNotifications(){

  //   if(sessionStorage.length > 0 && this.id != null){
  //     this.notificationService.getAllNotifications(this.id).subscribe(d=>{
  //       console.log("notifications on app component")
  //       if(d.status == 200){

  //         d.result.map(data=>{
  //           this.notifyMe(data.message);
  //         })
  //       }
  //       else{
  //         console.log("no new notifications");

  //       }

  //     })
  //   }
  // }

  notifyMe(msg) {
    this.notificationObj.notification.title =
      "New notification from JI COMPLAIN";
    this.notificationObj.notification.body = msg;
    // this.notificationObj.notification.icon = "assets/MTLSAUVAGE-LOGO.png";
    this.notificationObj.to = this.token;
    this.messagingService.sendNotification(this.notificationObj).subscribe();
  }

  goOnline() {
    this.stompClient.send(`/app/go-online/${this.email}`, {});
  }

  goOffline() {
    this.stompClient.send(`/app/go-offline/${this.email}`, {});
  }

  goToNewsFeed() {
    if (this.userType == "admin") {
      this.router.navigate(["discoverevents"]);
    } else {
      this.router.navigate(["newsfeed"]);
    }
  }

  // goToMyProfile() {
  //   this.router.navigate(["profiles/", this.id]);
// }

confirmation(){

}

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate([""]);
  }
  

  // getProfilePicture() {
  //   this.service.sendPicture$.subscribe((d) => {
  //     this.profilePicture = d;
  //   });
  // }

  updateNotificationCount() {
    this.notificationService.updateNotification$.subscribe(() => {
      this.getNotificationCount();
    });
  }
  getNotificationCount() {
    this.notificationService
      .getNumberOfNotifications(this.id)
      .subscribe((res) => {
        // console.log(res);
        this.notificationCount = res.result.numberOfNotifications;
        this.reqCount = res.result.numberOfFriendRequests;
        // console.log("notification count ",res.result.numberOfNotifications);
        // console.log("req count ",res.result.numberOfFriendRequests);

      });

      // console.log("notification count ",this.notificationCount)
      // console.log("req count ",this.reqCount)

  }

  // gotoChatroom(friendId) {
  //   this.chatService.initiateChat(this.id, friendId).subscribe((chatroom) => {
  //     this.router.navigate([`chat/${chatroom}/${friendId}`]);
  //   });
  // }

  // getChatsCount() {
  //   this.chatService
  //     .getChatCount(this.id)
  //     .subscribe((res) => (this.chatCount = res));
  // }



  showNotification(msg) {
    const notification = new Notification("JI COMPLAIN", {
      body: msg,
      // icon: "assets/MTLSAUVAGE-LOGO.png",
    });
  }

  @HostListener("window:beforeinstallprompt", ["$event"])
  onbeforeinstallprompt(e) {
    // console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        // console.log("User accepted the A2HS prompt");
      } else {
        // console.log("User dismissed the A2HS prompt");
      }
      this.deferredPrompt = null;
    });
  }

  // goToAddPostNotifications() {
  //   this.router.navigate([''])
  // }


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

userAreaName: any = []
getUser() {
    // let user: any
    // const email = this.getEmailByToken()
    this.userService.getUser().subscribe(data => {
      // console.log(data);
      this.userAreaName = data
      // console.log(this.userAreaName);
    }, error => {
      // console.log(error);
    });

  }

}
