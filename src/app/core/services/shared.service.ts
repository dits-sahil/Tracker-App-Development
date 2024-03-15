import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public showHideSidebar = new Subject<any>();

  constructor() { }
  convertDateToTimeStamp(date:Date){
    return new Date(date).getTime()
  }
  convertTimeStampToDate(date:Date){
    return new Date(date).toISOString();
  }
}
