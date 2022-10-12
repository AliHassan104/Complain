import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AchievementService } from '../Services/achievement.service';

@Component({
  selector: 'app-achievementdetailed',
  templateUrl: './achievementdetailed.component.html',
  styleUrls: ['./achievementdetailed.component.css']
})
export class AchievementdetailedComponent implements OnInit {

  constructor(private route: ActivatedRoute , private achievementService : AchievementService) {  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getAchievementsById(parseInt(id))
  }

  achievement : any = []

  getAchievementsById(id: number) {
    this.achievementService.getAchievementById(id).subscribe(data => {
      this.achievement = data
    }, error => {
    });
  }

}
