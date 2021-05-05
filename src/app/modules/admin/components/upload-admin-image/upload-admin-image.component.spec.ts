import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAdminImageComponent } from './upload-admin-image.component';

describe('UploadAdminImageComponent', () => {
  let component: UploadAdminImageComponent;
  let fixture: ComponentFixture<UploadAdminImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAdminImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAdminImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
