import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesAndAdvice } from './articles-and-advice';

describe('ArticlesAndAdvice', () => {
  let component: ArticlesAndAdvice;
  let fixture: ComponentFixture<ArticlesAndAdvice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesAndAdvice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesAndAdvice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
