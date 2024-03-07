import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MManageAssignmentComponent } from './m-manage-assignment.component';

describe('MManageAssignmentComponent', () => {
  let component: MManageAssignmentComponent;
  let fixture: ComponentFixture<MManageAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MManageAssignmentComponent]
    });
    fixture = TestBed.createComponent(MManageAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
