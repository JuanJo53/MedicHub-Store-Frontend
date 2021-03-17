import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePharmacyComponent } from './create-pharmacy.component';

describe('CreatePharmacyComponent', () => {
  let component: CreatePharmacyComponent;
  let fixture: ComponentFixture<CreatePharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
