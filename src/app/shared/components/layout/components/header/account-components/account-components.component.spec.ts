import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponentsComponent } from './account-components.component';

describe('AccountComponentsComponent', () => {
  let component: AccountComponentsComponent;
  let fixture: ComponentFixture<AccountComponentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponentsComponent]
    });
    fixture = TestBed.createComponent(AccountComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
