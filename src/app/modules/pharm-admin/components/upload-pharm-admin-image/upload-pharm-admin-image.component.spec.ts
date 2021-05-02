import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPharmAdminImageComponent } from './upload-pharm-admin-image.component';

describe('UploadPharmAdminImageComponent', () => {
  let component: UploadPharmAdminImageComponent;
  let fixture: ComponentFixture<UploadPharmAdminImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPharmAdminImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPharmAdminImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
