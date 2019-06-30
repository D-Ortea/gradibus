import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixRenderer } from './matrix-renderer';

describe('MatrixRendererComponent', () => {
  let component: MatrixRenderer;
  let fixture: ComponentFixture<MatrixRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
