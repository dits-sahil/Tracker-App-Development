import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAssignmentStatusComponent } from './change-assignment-status.component';

describe('ChangeAssignmentStatusComponent', () => {
  let component: ChangeAssignmentStatusComponent;
  let fixture: ComponentFixture<ChangeAssignmentStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeAssignmentStatusComponent]
    });
    fixture = TestBed.createComponent(ChangeAssignmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
