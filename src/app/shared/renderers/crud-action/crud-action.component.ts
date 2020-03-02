import { Component, OnInit } from '@angular/core';
import { AgCellRendererBase } from '../ag-cell-renderer-base';
import { AgCellRendererEvent } from '../ag-cell-renderer.event';

@Component({
  selector: 'app-crud-action',
  templateUrl: './crud-action.component.html',
  styleUrls: ['./crud-action.component.scss']
})
export class CrudActionComponent extends AgCellRendererBase {

  edit(event: any) {
    this.sendEvent(AgCellRendererEvent.EDIT_EVENT);
  }

  view(event: any) {
    this.sendEvent(AgCellRendererEvent.VIEW_EVENT);
  }

  delete(event: any) {
    this.sendEvent(AgCellRendererEvent.DELETE_EVENT);
  }

  active(event: any) {
    this.sendEvent(AgCellRendererEvent.ACTIVE_EVENT);
  }

}
