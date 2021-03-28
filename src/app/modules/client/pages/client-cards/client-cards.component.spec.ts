import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCardsComponent } from './client-cards.component';

describe('ClientCardsComponent', () => {
  let component: ClientCardsComponent;
  let fixture: ComponentFixture<ClientCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
