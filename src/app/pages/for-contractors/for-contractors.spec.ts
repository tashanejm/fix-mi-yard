import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForContractors } from './for-contractors';

describe('ForContractors', () => {
  let component: ForContractors;
  let fixture: ComponentFixture<ForContractors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForContractors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForContractors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
