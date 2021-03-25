import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubsiAdminComponent } from './create-subsi-admin.component';

describe('CreateSubsiAdminComponent', () => {
  let component: CreateSubsiAdminComponent;
  let fixture: ComponentFixture<CreateSubsiAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSubsiAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubsiAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
