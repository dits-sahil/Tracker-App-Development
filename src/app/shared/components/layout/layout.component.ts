import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Input() inputIsExpand: boolean = true
  @Output() getExpandSidebar = new EventEmitter<boolean>();

  isExpand = true;

  ngOnInit(){
    if (window.innerWidth >= 768 && window.innerWidth < 992 ) {
      this.isExpand =true
      } else {
       this.isExpand=false
      }
  }

  public expandOffItem(isExpandChild:boolean){
    if(isExpandChild){
      $("body").removeClass('showLess')
      $("body").addClass('showMore')
    }else{
      $("body").removeClass('showMore')
      $("body").addClass('showLess')
    }
    this.getExpandSidebar.emit(isExpandChild)
  }
}
