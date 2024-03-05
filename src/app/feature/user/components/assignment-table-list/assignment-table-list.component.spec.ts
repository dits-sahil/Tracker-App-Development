import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTableListComponent } from './assignment-table-list.component';

describe('AssignmentTableListComponent', () => {
  let component: AssignmentTableListComponent;
  let fixture: ComponentFixture<AssignmentTableListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentTableListComponent]
    });
    fixture = TestBed.createComponent(AssignmentTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
