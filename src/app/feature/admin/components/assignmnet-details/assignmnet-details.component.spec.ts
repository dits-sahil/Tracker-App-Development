import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmnetDetailsComponent } from './assignmnet-details.component';

describe('AssignmnetDetailsComponent', () => {
  let component: AssignmnetDetailsComponent;
  let fixture: ComponentFixture<AssignmnetDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmnetDetailsComponent]
    });
    fixture = TestBed.createComponent(AssignmnetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
