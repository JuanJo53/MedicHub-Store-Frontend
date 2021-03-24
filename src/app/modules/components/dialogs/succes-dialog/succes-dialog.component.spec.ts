import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesDialogComponent } from './succes-dialog.component';

describe('SuccesDialogComponent', () => {
  let component: SuccesDialogComponent;
  let fixture: ComponentFixture<SuccesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
