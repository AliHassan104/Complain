import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string) {
    let a:any
    if (parseInt(value.slice(0,2)) > 12) {
      a = parseInt(value.slice(0,2))-12 + "" + value.slice(2,5) + " pm"
      if (parseInt(value.slice(0,2))-12 < 10) {
        a = "0"+a
      }
    }else{
      a = value + " am"
    }
    return a;
  }

}
