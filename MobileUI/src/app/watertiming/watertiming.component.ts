import { Component, OnInit } from '@angular/core';
import { WatertimingService } from '../Services/watertiming.service';

@Component({
  selector: 'app-watertiming',
  templateUrl: './watertiming.component.html',
  styleUrls: ['./watertiming.component.css']
})
export class WatertimingComponent implements OnInit {

  public isCollapsed = false;


  constructor(private waterTimingService: WatertimingService) { }

  ngOnInit(): void {
    this.getWaterTiming()
  }

  areaWaterTimimg : any;
  areaName = ''
  getWaterTiming() {
    this.waterTimingService.getAllWaterTiming().subscribe(data => {
      this.areaWaterTimimg = data
      this.areaName = this.areaWaterTimimg[0].area_name
    }, error => {
    });
  }
}
