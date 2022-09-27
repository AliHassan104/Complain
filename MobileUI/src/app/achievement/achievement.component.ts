import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AchievementService } from '../Services/achievement.service';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {


  constructor(private achievementService : AchievementService) {}

  ngOnInit(): void {
    this.getAchievements()
  }

  lists : any = []

  getAchievements() {
    this.achievementService.getAllAchievement().subscribe(data => {
      this.lists = data
      // console.log(data);
      this.checkListLength()
    }, error => {
      console.log(error);
    });
  }

  sizeOfList : boolean;
  checkListLength(){
    if (this.lists.length == 0) {
      this.sizeOfList = false;
    }else{
      this.sizeOfList = false;
    }
  }

}
