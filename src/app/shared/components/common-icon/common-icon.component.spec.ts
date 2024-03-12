import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonIconComponent } from './common-icon.component';

describe('CommonIconComponent', () => {
  let component: CommonIconComponent;
  let fixture: ComponentFixture<CommonIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonIconComponent]
    });
    fixture = TestBed.createComponent(CommonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
