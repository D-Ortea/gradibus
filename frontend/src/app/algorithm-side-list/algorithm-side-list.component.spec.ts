import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmSideListComponent } from './algorithm-side-list.component';

describe('AlgorithmSideListComponent', () => {
  let component: AlgorithmSideListComponent;
  let fixture: ComponentFixture<AlgorithmSideListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmSideListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmSideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
