import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitiesPage } from './habilities-page';

describe('HabilitiesPage', () => {
  let component: HabilitiesPage;
  let fixture: ComponentFixture<HabilitiesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabilitiesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HabilitiesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
