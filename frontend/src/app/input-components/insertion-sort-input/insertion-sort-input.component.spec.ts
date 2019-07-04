import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertionSortInputComponent } from './insertion-sort-input.component';

describe('InsertionSortInputComponent', () => {
  let component: InsertionSortInputComponent;
  let fixture: ComponentFixture<InsertionSortInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertionSortInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertionSortInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
