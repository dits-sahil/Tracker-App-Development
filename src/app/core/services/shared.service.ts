import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public showHideSidebar = new Subject<any>();

  constructor() { }
  convertDateToTimeStamp(date: Date) {
    return new Date(date).getTime()
  }
  convertTimeStampToDate(date: Date) {
    return new Date(date).toISOString();
  }
  convertISOToDate(val: Date) {
   let  date:any = new Date(val);
   let  year:any = date.getFullYear();
   let  month:any = date.getMonth() + 1;
   let  dt:any = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return(year + '/' + month + '/' + dt);
  }
}
