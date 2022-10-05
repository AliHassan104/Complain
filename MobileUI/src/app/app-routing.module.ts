import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { NewsfeedPageComponent } from './newsfeed-page/newsfeed-page.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PostComponent } from './post/post.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { ViewImageComponent } from './view-image/view-image.component';
import { ChatComponent } from './chat/chat.component';
import { AddEventComponent } from './add-event/add-event.component';
import { DiscoverEventsComponent } from './discover-events/discover-events.component';
import { EventPreviewComponent } from './event-preview/event-preview.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddpostNotificationsComponent } from './addpost-notifications/addpost-notifications.component';
import { HomeComponent } from './home/home.component';
import { MycomplainComponent } from './mycomplain/mycomplain.component';
import { AchievementComponent } from './achievement/achievement.component';
import { EventComponent } from './event/event.component';
import { PollingquestionComponent } from './pollingquestion/pollingquestion.component';
import { HelpComponent } from './help/help.component';
import { WatertimingComponent } from './watertiming/watertiming.component';
import { DocumentComponent } from './document/document.component';
import { ComplaintimelineComponent } from './complaintimeline/complaintimeline.component';
import { AchievementdetailedComponent } from './achievementdetailed/achievementdetailed.component';
import { EventdetailedComponent } from './eventdetailed/eventdetailed.component';
import { PollingsubmitComponent } from './pollingsubmit/pollingsubmit.component';
import { HomeGuard } from './Guards/home.guard';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


const routes: Routes = [
  // {
  //   path: "", component: LoginPageComponent,

  // },
  {
    path: "", component: LoginPageComponent
  },
  {
    path: "login", component: LoginPageComponent
  },
  {
    path: "home", component: HomeComponent , canActivate:[HomeGuard]
  },
  {
    path: "mycomplain", component: MycomplainComponent , canActivate:[HomeGuard]
  },
  {
    path: "complaintimeline/:id", component: ComplaintimelineComponent , canActivate:[HomeGuard]
  },
  {
    path: "achievement", component: AchievementComponent , canActivate:[HomeGuard]
  },
  {
    path: "achivementdetails/:id", component: AchievementdetailedComponent , canActivate:[HomeGuard]
  },
  {
    path: "event", component: EventComponent , canActivate:[HomeGuard]
  },
  {
    path: "eventdetailed/:id", component: EventdetailedComponent , canActivate:[HomeGuard]
  },
  {
    path: "watertiming", component: WatertimingComponent , canActivate:[HomeGuard]
  },
  {
    path: "document", component: DocumentComponent , canActivate:[HomeGuard]
  },
  {
    path: "pollingquestion", component: PollingquestionComponent , canActivate:[HomeGuard]
  },
  {
    path: "pollingquestion/:id", component: PollingsubmitComponent , canActivate:[HomeGuard]
  },
  {
    path: "help", component: HelpComponent , canActivate:[HomeGuard]
  },
  {
    path: "register", component: RegisterPageComponent
  },
  {
    path: "forget-password", component: ForgetPasswordComponent
  },
  {
    path: "**", redirectTo: 'login' , pathMatch: 'full'
  },















  {
    path: "newsfeed", component: NewsfeedPageComponent
  },
  {
    path: "search", component: SearchComponent
  },
  {
    path: "profiles/:id", component: ProfileComponent
  },
  {
    path: "notifications", component: NotificationsComponent
  },
  {
    path: "post", component: PostComponent
  },
  {
    path: 'blogpost/:id', component: BlogpostComponent
  }, {
    path: 'viewimage/:id', component: ViewImageComponent
  },
  {
    path: 'chat/:chatroom/:friendId', component: ChatComponent
  },
  {
    path: 'addevent', component: AddEventComponent
  },
  {
    path: 'discoverevents', component: DiscoverEventsComponent
  },
  {
    path: 'previewevent/:id', component: EventPreviewComponent
  },
  {
    path: 'editevent/:id', component: AddEventComponent
  },
  {
    path: 'chatroom', component: ChatroomComponent
  },
  {
    path:'edit-post/:id',component:EditPostComponent
  },
  {
    path:'resetlink/:uuid',component:ResetPasswordComponent
  },
  {
    path:'addpostnotifications',component:AddpostNotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
