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
      //this.areaWaterTimimg=data
      debugger
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

  // getWaterTiming() {
  //   // this.userService.getUser().subscribe((user:any)=>{
  //   //   this.waterTimingService.getWaterTimingOfArea(user.area.id).subscribe((data:any)=>{
  //   //     console.log(data);
  //   //     this.areaName=user.area.name
  //   //     this.areaWaterTimimg=data
  //   //   })
  //   // })
  //   this.waterTimingService.getAllWaterTiming().subscribe((data:any) => {
  //     //loop on data
  //     // {
  //       // id:
  //       // past:true
  //       // }

  //     this.areaWaterTimimg = data
  //     // console.log(this.areaWaterTimimg);
  //     // data.forEach((v: any) => {
  //     //   v.waterTimingDtoList.forEach((watertime: any , index : any)=>{
  //     //     // console.log();
  //     //     let i=0
  //     //     // console.log(v);
  //     //     let obj = {past : this.isInThePast(watertime.date)}
  //     //     // v.waterTimingDtoList[`${i}`].push(obj)
  //     //     v.waterTimingDtoList.push(this.isInThePast(watertime.date))
  //     //     i++
  //     //   })
  //     // });
  //     // console.log(this.areaWaterTimimg);
  //     // this.areaName = this.areaWaterTimimg[0].area_name
  //   }, error => {
  //   });
  // }

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
