import { Component, OnInit, ViewChild, Input, ComponentFactoryResolver } from '@angular/core';
import { InputDirective } from '../input.directive';
import { AlgorithmMetadata } from '../algorithm.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() algoData: AlgorithmMetadata;

  @ViewChild(InputDirective, { static: true }) inputHost: InputDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(this.algoData.component);

    const viewContainerRef = this.inputHost.viewContainerRef;
    viewContainerRef.clear();

    viewContainerRef.createComponent(componentFactory);
  }

}
