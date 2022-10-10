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

  achievements : any = []

  getAchievements() {
    this.achievementService.getAllAchievement().subscribe(data => {
      // console.log(123);

      // console.log(data);

      this.achievements = data
      this.achievements = this.achievements.content
    }, error => {
    });
  }


}
