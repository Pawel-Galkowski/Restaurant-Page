import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAppComponent } from './header.component';

describe('TopAppComponent', () => {
  let component: TopAppComponent;
  let fixture: ComponentFixture<TopAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopAppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
