import {Component, OnInit} from '@angular/core';
import {fabric} from 'fabric';
import {Canvas} from "fabric/fabric-impl";
import {FabricService} from "../../shared/service/fabric.service";


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  private readonly _canvas: Canvas;

  constructor(public fabricService: FabricService) {
    this._canvas = new fabric.Canvas('fabricSurface', {
      isDrawingMode: true,
      interactive: true,
      backgroundColor: '#ebebef',
      selection: true,
      preserveObjectStacking: true,
    });
  }

  ngOnInit(): void {
    this.fabricService.canvas = this._canvas;
  }

}
