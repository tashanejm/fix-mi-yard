import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTemplate } from './project-template';

describe('ProjectTemplate', () => {
  let component: ProjectTemplate;
  let fixture: ComponentFixture<ProjectTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
