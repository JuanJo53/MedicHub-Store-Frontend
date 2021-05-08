import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmReportsPageComponent } from './pharm-reports-page.component';

describe('PharmReportsPageComponent', () => {
  let component: PharmReportsPageComponent;
  let fixture: ComponentFixture<PharmReportsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmReportsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmReportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
