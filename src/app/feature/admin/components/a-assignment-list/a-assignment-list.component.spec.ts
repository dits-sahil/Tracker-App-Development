import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AAssignmentListComponent } from './a-assignment-list.component';

describe('AAssignmentListComponent', () => {
  let component: AAssignmentListComponent;
  let fixture: ComponentFixture<AAssignmentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AAssignmentListComponent]
    });
    fixture = TestBed.createComponent(AAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
