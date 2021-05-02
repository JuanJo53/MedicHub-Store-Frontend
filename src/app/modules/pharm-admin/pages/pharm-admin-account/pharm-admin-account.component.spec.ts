import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmAdminAccountComponent } from './pharm-admin-account.component';

describe('PharmAdminAccountComponent', () => {
  let component: PharmAdminAccountComponent;
  let fixture: ComponentFixture<PharmAdminAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmAdminAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmAdminAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
