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
    this.getComplainLog(parseInt(id))
  }

  complain: any = []

  getComplainById(id: number) {

    this.mycomplainService.getAllComplainById(id).subscribe(data => {
      this.complain = data
      this.TimeToTakeComplete()
    }, error => {
    });
  }

  complainLog : any
  getComplainLog(id: number) {
    this.mycomplainService.getComplainLogById(id).subscribe(data => {
      this.items = data
      this.TimeToTakeComplete()
    }, error => {
    });
  }


  items: any = [
  //   {
  //       "id": 3,
  //       "status": "IN_REVIEW",
  //       "date": [
  //           2022,
  //           9,
  //           29
  //       ],
  //       "assignedFrom": null,
  //       "assignedTo": null,
  //       "description": "Your Complain is in review please wait",
  //       "complain": null
  //   }
  //   ,
  //   {
  //     "id": 3,
  //     "status": "IN_PROGRESS",
  //     "date": [
  //         2022,
  //         10,
  //         1
  //     ],
  //     "assignedFrom": null,
  //     "assignedTo": null,
  //     "description": "Your Complain Is In Progress",
  //     "complain": null
  // }
  //   ,
  //   {
  //     "id": 3,
  //     "status": "REJECTED",
  //     "date": [
  //         2022,
  //         10,
  //         1
  //     ],
  //     "assignedFrom": null,
  //     "assignedTo": null,
  //     "description": "Your Complain Got Rejected",
  //     "complain": null
  // }
  //   ,
  //   {
  //     "id": 3,
  //     "status": "COMPLETED",
  //     "date": [
  //         2022,
  //         10,
  //         7
  //     ],
  //     "assignedFrom": null,
  //     "assignedTo": null,
  //     "description": "Your Complain is Completed",
  //     "complain": null
  // }
]

  timeToGetCompleted = []

  TimeToTakeComplete(){
    let myDate: any = new Date(this.complain.date);

    this.timeToGetCompleted.push(myDate.setDate(myDate.getDate() + 2));

    this.timeToGetCompleted.push(myDate.setDate(myDate.getDate() + 7));

  }

}
