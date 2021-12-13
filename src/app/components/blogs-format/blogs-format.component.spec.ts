import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsFormatComponent } from './blogs-format.component';

describe('BlogsFormatComponent', () => {
  let component: BlogsFormatComponent;
  let fixture: ComponentFixture<BlogsFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
