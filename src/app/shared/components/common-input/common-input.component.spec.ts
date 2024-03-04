import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonInputComponent } from './common-input.component';

describe('CommonInputComponent', () => {
  let component: CommonInputComponent;
  let fixture: ComponentFixture<CommonInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonInputComponent]
    });
    fixture = TestBed.createComponent(CommonInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
