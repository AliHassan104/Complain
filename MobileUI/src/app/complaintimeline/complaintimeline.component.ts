import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MycomplainService } from '../Services/mycomplain.service';

@Component({
  selector: 'app-complaintimeline',
  templateUrl: './complaintimeline.component.html',
  styleUrls: ['./complaintimeline.component.css']
})
export class ComplaintimelineComponent implements OnInit {

  constructor(private route: ActivatedRoute , private mycomplainService : MycomplainService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');;

    this.getComplainById(parseInt(id))
  }

  complain: any = []
  getComplainById(id: number) {

    this.mycomplainService.getAllComplainById(id).subscribe(data => {
      this.complain = data
      // console.log(data);
      this.TimeToTakeComplete()
    }, error => {
      console.log(error);
    });
  }

  timeToGetCompleted = []

  TimeToTakeComplete(){
    let myDate: any = new Date(this.complain.date);

    this.timeToGetCompleted.push(myDate.setDate(myDate.getDate() + 2));

    this.timeToGetCompleted.push(myDate.setDate(myDate.getDate() + 7));

  }

}
