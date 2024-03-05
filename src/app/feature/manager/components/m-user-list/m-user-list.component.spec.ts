import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MUserListComponent } from './m-user-list.component';

describe('MUserListComponent', () => {
  let component: MUserListComponent;
  let fixture: ComponentFixture<MUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MUserListComponent]
    });
    fixture = TestBed.createComponent(MUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
