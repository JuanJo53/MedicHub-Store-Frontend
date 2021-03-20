import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmAdminsComponent } from './pharm-admins.component';

describe('PharmAdminsComponent', () => {
  let component: PharmAdminsComponent;
  let fixture: ComponentFixture<PharmAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
