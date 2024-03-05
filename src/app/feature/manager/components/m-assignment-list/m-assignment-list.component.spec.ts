import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAssignmentListComponent } from './m-assignment-list.component';

describe('MAssignmentListComponent', () => {
  let component: MAssignmentListComponent;
  let fixture: ComponentFixture<MAssignmentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MAssignmentListComponent]
    });
    fixture = TestBed.createComponent(MAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
