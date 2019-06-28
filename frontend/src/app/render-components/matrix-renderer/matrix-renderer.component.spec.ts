import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixRendererComponent } from './matrix-renderer.component';

describe('MatrixRendererComponent', () => {
  let component: MatrixRendererComponent;
  let fixture: ComponentFixture<MatrixRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
