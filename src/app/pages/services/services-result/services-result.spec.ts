import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesResult } from './services-result';

describe('ServicesResult', () => {
  let component: ServicesResult;
  let fixture: ComponentFixture<ServicesResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
