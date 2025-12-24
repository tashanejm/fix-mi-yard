import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCriteria } from './search-criteria';

describe('SearchCriteria', () => {
  let component: SearchCriteria;
  let fixture: ComponentFixture<SearchCriteria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCriteria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCriteria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
