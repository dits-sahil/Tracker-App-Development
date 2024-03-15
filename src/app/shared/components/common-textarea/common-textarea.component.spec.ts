import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTextareaComponent } from './common-textarea.component';

describe('CommonTextareaComponent', () => {
  let component: CommonTextareaComponent;
  let fixture: ComponentFixture<CommonTextareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonTextareaComponent]
    });
    fixture = TestBed.createComponent(CommonTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
