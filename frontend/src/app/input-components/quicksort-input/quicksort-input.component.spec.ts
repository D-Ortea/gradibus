import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuicksortInputComponent } from './quicksort-input.component';

describe('QuicksortInputComponent', () => {
  let component: QuicksortInputComponent;
  let fixture: ComponentFixture<QuicksortInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuicksortInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuicksortInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
