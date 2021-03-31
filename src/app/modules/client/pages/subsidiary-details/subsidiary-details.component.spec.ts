import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidiaryDetailsComponent } from './subsidiary-details.component';

describe('SubsidiaryDetailsComponent', () => {
  let component: SubsidiaryDetailsComponent;
  let fixture: ComponentFixture<SubsidiaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsidiaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsidiaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
