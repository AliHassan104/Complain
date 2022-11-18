import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementService } from '../Services/announcement.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {


  constructor(private router : Router , private announcementService : AnnouncementService , private userService : UserService) { }

  ngOnInit(): void {
    this.getUser()
  }

  announcement : any = []

  getAllAnnouncementByAreaId(area : any) {
    
    this.announcementService.getAllAnnouncement(area).subscribe(data => {
     this.announcement = data 
     console.log(this.announcement);
     
    })
  }

  getUser() {
    let user: any
    this.userService.getUser().subscribe(data => {
      user = data
      
      this.getAllAnnouncementByAreaId(user.area.id)

    }, error => {
    });
  }

}
