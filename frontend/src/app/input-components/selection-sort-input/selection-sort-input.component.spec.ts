import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionSortInputComponent } from './selection-sort-input.component';

describe('SelectionSortInputComponent', () => {
  let component: SelectionSortInputComponent;
  let fixture: ComponentFixture<SelectionSortInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionSortInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionSortInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
