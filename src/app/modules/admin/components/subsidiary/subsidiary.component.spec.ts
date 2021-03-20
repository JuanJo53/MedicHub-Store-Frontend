import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidiaryComponent } from './subsidiary.component';

describe('SubsidiaryComponent', () => {
  let component: SubsidiaryComponent;
  let fixture: ComponentFixture<SubsidiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsidiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsidiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
