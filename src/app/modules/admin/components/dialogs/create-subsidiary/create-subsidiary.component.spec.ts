import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubsidiaryComponent } from './create-subsidiary.component';

describe('CreateSubsidiaryComponent', () => {
  let component: CreateSubsidiaryComponent;
  let fixture: ComponentFixture<CreateSubsidiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSubsidiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubsidiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
