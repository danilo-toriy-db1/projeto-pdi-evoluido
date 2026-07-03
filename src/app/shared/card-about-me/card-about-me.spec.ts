import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAboutMe } from './card-about-me';

describe('CardAboutMe', () => {
  let component: CardAboutMe;
  let fixture: ComponentFixture<CardAboutMe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAboutMe],
    }).compileComponents();

    fixture = TestBed.createComponent(CardAboutMe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
