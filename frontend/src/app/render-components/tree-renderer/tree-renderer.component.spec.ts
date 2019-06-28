import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeRendererComponent } from './tree-renderer.component';

describe('TreeRendererComponent', () => {
  let component: TreeRendererComponent;
  let fixture: ComponentFixture<TreeRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
