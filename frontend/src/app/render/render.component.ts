import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RenderService } from '../render.service';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css']
})
export class RenderComponent implements OnInit {

  @ViewChild('renderArea', {static: true}) renderArea: ElementRef;

  constructor(private renderService: RenderService) { }
  
  ngOnInit() {
    this.renderService.getAlgorithm().subscribe(algorithm => {
      this.renderArea.nativeElement.innerHTML = '';
      algorithm.rendererContainer.appendInto(this.renderArea.nativeElement);
    });
  }

}
