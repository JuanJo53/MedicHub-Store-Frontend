import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmDashboardComponent } from './pharm-dashboard.component';

describe('PharmDashboardComponent', () => {
  let component: PharmDashboardComponent;
  let fixture: ComponentFixture<PharmDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
