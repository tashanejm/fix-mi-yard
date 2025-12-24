import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSelection } from './quick-selection';

describe('QuickSelection', () => {
  let component: QuickSelection;
  let fixture: ComponentFixture<QuickSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
