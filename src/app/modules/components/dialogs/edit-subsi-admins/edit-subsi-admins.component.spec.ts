import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubsiAdminsComponent } from './edit-subsi-admins.component';

describe('EditSubsiAdminsComponent', () => {
  let component: EditSubsiAdminsComponent;
  let fixture: ComponentFixture<EditSubsiAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubsiAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubsiAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
