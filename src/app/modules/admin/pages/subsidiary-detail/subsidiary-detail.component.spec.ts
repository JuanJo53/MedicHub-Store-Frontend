import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidiaryDetailComponent } from './subsidiary-detail.component';

describe('SubsidiaryDetailComponent', () => {
  let component: SubsidiaryDetailComponent;
  let fixture: ComponentFixture<SubsidiaryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsidiaryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsidiaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
