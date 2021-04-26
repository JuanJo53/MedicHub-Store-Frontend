import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPharmImageComponent } from './upload-pharm-image.component';

describe('UploadPharmImageComponent', () => {
  let component: UploadPharmImageComponent;
  let fixture: ComponentFixture<UploadPharmImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPharmImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPharmImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
