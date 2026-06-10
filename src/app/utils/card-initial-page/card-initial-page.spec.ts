import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInitialPage } from './card-initial-page';

describe('CardInitialPage', () => {
  let component: CardInitialPage;
  let fixture: ComponentFixture<CardInitialPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInitialPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CardInitialPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
