import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleSortInputComponent } from './bubble-sort-input.component';

describe('BubbleSortComponent', () => {
  let component: BubbleSortInputComponent;
  let fixture: ComponentFixture<BubbleSortInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleSortInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleSortInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
