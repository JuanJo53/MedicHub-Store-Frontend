import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadClientImageComponent } from './upload-client-image.component';

describe('UploadClientImageComponent', () => {
  let component: UploadClientImageComponent;
  let fixture: ComponentFixture<UploadClientImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadClientImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadClientImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
