import {Component, NgZone, OnInit} from '@angular/core';
import {fabric} from 'fabric';
import {Canvas} from "fabric/fabric-impl";
import {FabricService} from "../../shared/services/fabric.service";


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  private canvas: Canvas = new fabric.Canvas('fabricSurface');

  constructor(public fabricService: FabricService, private zone: NgZone) {
  }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('fabricSurface', {
      isDrawingMode: true,
      interactive: true,
      backgroundColor: '#ffffff',
      selection: true,
      preserveObjectStacking: true,
    });
    this.canvas.freeDrawingBrush = new fabric.PencilBrush()
    this.fabricService.canvas = this.canvas;
    this.canvas.on('path:created', this.fabricService.SaveCanvas)
    this.canvas.on('object:modified', this.fabricService.SaveCanvas)
    this.fabricService.LoadCanvas().then(canvas => canvas && this.canvas.loadFromJSON(canvas, () => {
    }))
  }

  OnDrawingColorChange(event: Event) {
    // @ts-ignore
    this.canvas.freeDrawingBrush.color = event.target.value;
  }
}
