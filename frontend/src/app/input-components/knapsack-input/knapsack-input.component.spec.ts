import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnapsackInputComponent } from './knapsack-input.component';

describe('KnapsackInputComponent', () => {
  let component: KnapsackInputComponent;
  let fixture: ComponentFixture<KnapsackInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnapsackInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnapsackInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
