import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmAdminComponent } from './pharm-admin.component';

describe('PharmAdminComponent', () => {
  let component: PharmAdminComponent;
  let fixture: ComponentFixture<PharmAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
