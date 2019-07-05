import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortInputComponent } from './sort-input.component';

describe('SortInputComponentComponent', () => {
  let component: SortInputComponent;
  let fixture: ComponentFixture<SortInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
