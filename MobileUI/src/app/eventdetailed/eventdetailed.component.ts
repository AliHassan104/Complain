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
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getEventById(parseInt(id))
  }

  event : any = []

  getEventById(id: number) {
    this.eventsService.getEventById(id).subscribe(data => {
      this.event = data
    }, error => {
    });
  }


}
