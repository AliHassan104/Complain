import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NoopInterceptor } from './request.intercept';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NewsfeedPageComponent } from './newsfeed-page/newsfeed-page.component';
import { SearchComponent } from './search/search.component';
import { IonicModule } from '@ionic/angular';
import { OwlModule } from 'ngx-owl-carousel';
import { ProfileComponent } from './profile/profile.component';
import { AppSideBarComponent } from './app-side-bar/app-side-bar.component';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
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
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './services/messaging.service';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { AddpostNotificationsComponent } from './addpost-notifications/addpost-notifications.component';
import { NgxUiLoaderModule,NgxUiLoaderHttpModule  } from 'ngx-ui-loader';
import { HomeComponent } from './home/home.component';
import { MycomplainComponent } from './mycomplain/mycomplain.component';
import { AchievementComponent } from './achievement/achievement.component';
import { EventComponent } from './event/event.component';
import { WatertimingComponent } from './watertiming/watertiming.component';
import { PollingquestionComponent } from './pollingquestion/pollingquestion.component';
import { HelpComponent } from './help/help.component';
import { DocumentComponent } from './document/document.component';
import { ComplaintimelineComponent } from './complaintimeline/complaintimeline.component';
import { AchievementdetailedComponent } from './achievementdetailed/achievementdetailed.component';
import { EventdetailedComponent } from './eventdetailed/eventdetailed.component';
import { PollingsubmitComponent } from './pollingsubmit/pollingsubmit.component';
import { HomeGuard } from './Guards/home.guard';
// import { Header} from './interceptor/header.interceptor';
import { TimePipe } from './Pipes/time.pipe';
import { HeaderInterceptor } from './Interceptor/header.interceptor';






@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NewsfeedPageComponent,
    SearchComponent,
    ProfileComponent,
    AppSideBarComponent,
    BottomMenuComponent,
    NotificationsComponent,
    PostComponent,
    BlogpostComponent,
    ViewImageComponent,
    ChatComponent,
    AddEventComponent,
    DiscoverEventsComponent,
    EventPreviewComponent,
    ChatroomComponent,
    EditPostComponent,
    ResetPasswordComponent,
    AddpostNotificationsComponent,
    HomeComponent,
    MycomplainComponent,
    AchievementComponent,
    EventComponent,
    WatertimingComponent,
    PollingquestionComponent,
    HelpComponent,
    DocumentComponent,
    ComplaintimelineComponent,
    AchievementdetailedComponent,
    EventdetailedComponent,
    PollingsubmitComponent,
    TimePipe,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ServiceWorkerModule.register('ngsw-worker.js',{enabled: true}),
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    OwlModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    NgxUiLoaderModule

  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: NoopInterceptor,
    //   multi: true
    // },
    {
        provide :  HTTP_INTERCEPTORS,
        useClass : HeaderInterceptor,
        multi : true
    },
    MessagingService,AsyncPipe,HomeGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
