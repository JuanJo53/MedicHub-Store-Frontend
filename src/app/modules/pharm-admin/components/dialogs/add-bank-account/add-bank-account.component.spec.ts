import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankAccountComponent } from './add-bank-account.component';

describe('AddBankAccountComponent', () => {
  let component: AddBankAccountComponent;
  let fixture: ComponentFixture<AddBankAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBankAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
