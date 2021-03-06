import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoCardComponent } from './algo-card.component';

describe('AlgoCardComponent', () => {
  let component: AlgoCardComponent;
  let fixture: ComponentFixture<AlgoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
