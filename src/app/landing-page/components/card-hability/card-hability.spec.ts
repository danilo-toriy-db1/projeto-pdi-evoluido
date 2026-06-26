import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHability } from './card-hability';

describe('CardHability', () => {
  let component: CardHability;
  let fixture: ComponentFixture<CardHability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHability],
    }).compileComponents();

    fixture = TestBed.createComponent(CardHability);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
