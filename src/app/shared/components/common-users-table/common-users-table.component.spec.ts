import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonUsersTableComponent } from './common-users-table.component';

describe('CommonUsersTableComponent', () => {
  let component: CommonUsersTableComponent;
  let fixture: ComponentFixture<CommonUsersTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonUsersTableComponent]
    });
    fixture = TestBed.createComponent(CommonUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
