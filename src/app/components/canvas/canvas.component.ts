import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {fabric} from 'fabric';
import {Canvas} from "fabric/fabric-impl";
import {FabricService} from "../../shared/services/fabric.service";


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit {
  private canvas: Canvas = new fabric.Canvas('fabricSurface');

  constructor(public fabricService: FabricService, private zone: NgZone) {
  }

  async ngAfterViewInit(): Promise<void> {

  }

  async ngOnInit(): Promise<void> {
    this.canvas = new fabric.Canvas('fabricSurface', {
      isDrawingMode: true,
      interactive: true,
      backgroundColor: '#ffffff',
      selection: true,
      preserveObjectStacking: true,
    });
    this.fabricService.canvas = this.canvas;
    this.canvas.on('path:created', this.saveCanvas.bind(this));
    this.canvas.on('object:modified', this.saveCanvas.bind(this));
    const savedCanvas = await this.fabricService.LoadCanvas();
    this.canvas.loadFromJSON(JSON.parse(savedCanvas), () => {
    });
  }

  OnDrawingColorChange(event: Event) {
    // @ts-ignore
    this.canvas.freeDrawingBrush.color = event.target.value;
  }

  saveCanvas() {
    this.fabricService.SaveCanvas();
  }
}
