import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OwlModule } from 'ngx-owl-carousel';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './services/messaging.service';
import { AsyncPipe } from '../../node_modules/@angular/common';
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
import { TimePipe } from './Pipes/time.pipe';
import { HeaderInterceptor } from './Interceptor/header.interceptor';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { RegisterpendingComponent } from './registerpending/registerpending.component';
import { ResponseInterceptor } from './Interceptor/response.interceptor';
import { CommonModule} from '@angular/common';
import { AnnouncementComponent } from './announcement/announcement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    BottomMenuComponent,
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
    ForgetPasswordComponent,
    NewPasswordComponent,
    RegisterpendingComponent,
    AnnouncementComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js',{enabled: true}),
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
    NgxUiLoaderModule,
    IonicModule,
    CommonModule

  ],
  providers: [
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
