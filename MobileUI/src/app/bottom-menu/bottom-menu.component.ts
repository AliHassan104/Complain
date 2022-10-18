import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
// import { MainService } from "../Services/main.service";
import { NotificationService } from "../Services/notification.service";
// import { ChatService } from "../Services/chat.service";
// import { environment } from "../../environments/environment";
// import * as Stomp from "stompjs";
// import * as SockJS from "sockjs-client";
// import * as moment from "moment";
import { ToastUtilService } from "../Services/toast-util.service";
import * as $ from "jquery";
import { MessagingService } from "../services/messaging.service";
// import { NotificationBody } from "./notificationBody";
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
  reqCount: number = 0;

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

  // closeDialogue(){
  //   this.marker.nativeElement.style.display = 'none'
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


  goOnline() {
    this.stompClient.send(`/app/go-online/${this.email}`, {});
  }

  goOffline() {
    this.stompClient.send(`/app/go-offline/${this.email}`, {});
  }

confirmation(){
}

  logout() {

    sessionStorage.clear();
    localStorage.clear();
    // this.router.navigate([""]);
    window.location.reload()
    // this.marker.nativeElement.style.display = 'block'
    // this.marker.nativeElement.style.position = 'absolute'

    
  }

  updateNotificationCount() {
    this.notificationService.updateNotification$.subscribe(() => {
      this.getNotificationCount();
    });
  }
  getNotificationCount() {
    this.notificationService
      .getNumberOfNotifications(this.id)
      .subscribe((res) => {
        this.notificationCount = res.result.numberOfNotifications;
        this.reqCount = res.result.numberOfFriendRequests;

      });

  }

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

  getToken() {
    let token = localStorage.getItem("jwtToken")
    if(token != null){
        return "Bearer "+token
    }
    return null;
  }

userAreaName: any = []
getUser() {
    this.userService.getUser().subscribe(data => {
      this.userAreaName = data
    }, error => {
    });
  }

}
