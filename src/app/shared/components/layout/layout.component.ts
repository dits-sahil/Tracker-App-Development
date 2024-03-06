import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Output() getExpandSidebar = new EventEmitter<boolean>();
  @Input() inputIsExpand: boolean = true 
  isExpand = true;
  
  ngOnInit(){
    if (window.innerWidth >= 768 && window.innerWidth < 992 ) {
      this.isExpand =true
      } else {
       this.isExpand=false
      }
  }
  toggleSidebar() {

    // Handle opening/closing of sidebar
  }

  closeSidebar() {
    // Handle closing of sidebar
  }
  
  public expandOffItem(isExpandChild:boolean){
    // if(isExpandChild){
    //   $("body").removeClass('showLess')
    //   $("body").addClass('showMore')
    // }else{
    //   $("body").removeClass('showMore')
    //   $("body").addClass('showLess')
    // }
    this.getExpandSidebar.emit(isExpandChild)
  }
}
