import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearchCriteria } from './global-search-criteria';

describe('GlobalSearchCriteria', () => {
  let component: GlobalSearchCriteria;
  let fixture: ComponentFixture<GlobalSearchCriteria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSearchCriteria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSearchCriteria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
