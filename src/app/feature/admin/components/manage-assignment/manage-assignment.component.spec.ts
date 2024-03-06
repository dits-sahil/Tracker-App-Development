import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssignmentComponent } from './manage-assignment.component';

describe('ManageAssignmentComponent', () => {
  let component: ManageAssignmentComponent;
  let fixture: ComponentFixture<ManageAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAssignmentComponent]
    });
    fixture = TestBed.createComponent(ManageAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
