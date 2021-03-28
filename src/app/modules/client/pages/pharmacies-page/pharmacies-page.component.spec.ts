import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaciesPageComponent } from './pharmacies-page.component';

describe('PharmaciesPageComponent', () => {
  let component: PharmaciesPageComponent;
  let fixture: ComponentFixture<PharmaciesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmaciesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaciesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
