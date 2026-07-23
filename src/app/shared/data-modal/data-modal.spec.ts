import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModal } from './data-modal';

describe('DataModal', () => {
  let component: DataModal;
  let fixture: ComponentFixture<DataModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataModal],
    }).compileComponents();

    fixture = TestBed.createComponent(DataModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
