import { Component, OnInit } from '@angular/core';
import { AgCellRendererBase } from '../ag-cell-renderer-base';
import { AgCellRendererEvent } from '../ag-cell-renderer.event';

@Component({
  selector: 'app-button-renderer',
  templateUrl: './button-renderer.component.html',
  styleUrls: ['./button-renderer.component.scss']
})
export class ButtonRendererComponent extends AgCellRendererBase {

  constructor() {
    super();
   }

  ngOnInit() {
  }
  onLink(event: MouseEvent) {
    this.sendEvent(AgCellRendererEvent.BUTTON, event);
  }
}
