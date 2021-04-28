import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageProductComponent } from './upload-image-product.component';

describe('UploadImageProductComponent', () => {
  let component: UploadImageProductComponent;
  let fixture: ComponentFixture<UploadImageProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImageProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
