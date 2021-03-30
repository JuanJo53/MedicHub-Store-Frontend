import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyItemComponent } from './pharmacy-item.component';

describe('PharmacyItemComponent', () => {
  let component: PharmacyItemComponent;
  let fixture: ComponentFixture<PharmacyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
