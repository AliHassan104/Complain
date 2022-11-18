import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
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
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RegisterpendingComponent } from './registerpending/registerpending.component';
import { AnnouncementComponent } from './announcement/announcement.component';


const routes: Routes = [
  {
    path: "", component: HomeComponent , canActivate:[HomeGuard]
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
    path: "register-pending", component: RegisterpendingComponent
  },
  {
    path: "forget-password", component: ForgetPasswordComponent
  },
  {
    path: "announcement", component: AnnouncementComponent , canActivate:[HomeGuard] 
  },
  {
    path: "**", redirectTo: 'home' , pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
