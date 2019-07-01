import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinarySearchTreeInputComponent } from './binary-search-tree-input.component';

describe('BinarySearchTreeInputComponent', () => {
  let component: BinarySearchTreeInputComponent;
  let fixture: ComponentFixture<BinarySearchTreeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinarySearchTreeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinarySearchTreeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
