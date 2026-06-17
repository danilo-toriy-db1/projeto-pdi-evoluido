import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonExcludeHability } from './button-exclude-hability';

describe('ButtonExcludeHability', () => {
  let component: ButtonExcludeHability;
  let fixture: ComponentFixture<ButtonExcludeHability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonExcludeHability],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonExcludeHability);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
