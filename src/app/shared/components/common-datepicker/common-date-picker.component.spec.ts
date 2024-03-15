import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDatePickerComponent } from './common-date-picker.component';

describe('CommonDatePickerComponent', () => {
  let component: CommonDatePickerComponent;
  let fixture: ComponentFixture<CommonDatePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonDatePickerComponent]
    });
    fixture = TestBed.createComponent(CommonDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
