import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidiariesComponent } from './subsidiaries.component';

describe('SubsidiariesComponent', () => {
  let component: SubsidiariesComponent;
  let fixture: ComponentFixture<SubsidiariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsidiariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsidiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
