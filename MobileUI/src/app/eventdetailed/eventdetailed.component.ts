import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../Services/events.service';

@Component({
  selector: 'app-eventdetailed',
  templateUrl: './eventdetailed.component.html',
  styleUrls: ['./eventdetailed.component.css']
})
export class EventdetailedComponent implements OnInit {

  constructor(private route: ActivatedRoute , private eventsService : EventsService) {
    // console.log(achievementService.getAchievementById());
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.getEventById(parseInt(id))
  }

  event : any = []

  getEventById(id: number) {
    this.eventsService.getEventById(id).subscribe(data => {
      this.event = data
      console.log(data);
    }, error => {
      console.log(error);
    });
  }


}
