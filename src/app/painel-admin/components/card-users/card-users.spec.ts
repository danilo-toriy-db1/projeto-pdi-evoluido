import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUsers } from './card-users';

describe('CardUsers', () => {
  let component: CardUsers;
  let fixture: ComponentFixture<CardUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardUsers],
    }).compileComponents();

    fixture = TestBed.createComponent(CardUsers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
