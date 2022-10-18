import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { WatertimingService } from '../Services/watertiming.service';

@Component({
  selector: 'app-watertiming',
  templateUrl: './watertiming.component.html',
  styleUrls: ['./watertiming.component.css']
})
export class WatertimingComponent implements OnInit {

  public isCollapsed = false;


  constructor(private waterTimingService: WatertimingService,
              private userService : UserService
    ) { }

  ngOnInit(): void {
    this.getBlock()
  }

  areaWaterTimimg : any = [];
  blocks :any;
  areaName = ''

  getBlock(){
    this.userService.getUser().subscribe((user:any)=>{
      this.areaName=user.area.name
      this.waterTimingService.getAllBlockOfArea(user.area.id).subscribe((data:any)=>{
        this.blocks=data
      })
    })
  }

  getWaterTimingByBlock(id: any){
    this.waterTimingService.getWaterTimingByBlock(id).subscribe((data:any)=>{
      let list = [];
      for(let wt of data){
        let obj = {
          id:wt.id,
          day:wt.day,
          date:wt.date,
          start_time:wt.start_time,
          end_time:wt.end_time,
          past:this.isInThePast(wt.date)
        }
        list.push(obj)
      }
      console.log(list)
      this.areaWaterTimimg = list
      // console.log(this.areaWaterTimimg);
    })

  }


  isInThePast(dateValue): boolean {
    let inPast: boolean = false;
    let today = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    let given = formatDate(new Date(dateValue), 'yyyy/MM/dd', 'en');
    if (given < today) {
      inPast = true;
    }
    return inPast;
  }
}
