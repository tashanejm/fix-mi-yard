import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularProjects } from './popular-projects';

describe('PopularProjects', () => {
  let component: PopularProjects;
  let fixture: ComponentFixture<PopularProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularProjects]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PopularProjects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
