import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSelectComponent } from './common-select.component';

describe('CommonSelectComponent', () => {
  let component: CommonSelectComponent;
  let fixture: ComponentFixture<CommonSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonSelectComponent]
    });
    fixture = TestBed.createComponent(CommonSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
