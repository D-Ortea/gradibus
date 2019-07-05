import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeSortInputComponent } from './merge-sort-input.component';

describe('MergeSortInputComponent', () => {
  let component: MergeSortInputComponent;
  let fixture: ComponentFixture<MergeSortInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeSortInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeSortInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
