import { Component, OnInit } from '@angular/core';
import { AgCellRendererBase } from '../ag-cell-renderer-base';
import { AgCellRendererEvent } from '../ag-cell-renderer.event';


@Component({
  selector: 'app-edit-action-renderer',
  templateUrl: './edit-action-renderer.component.html'
})
export class EditActionRendererComponent extends AgCellRendererBase {

  constructor() {
    super();
  }
  
  edit(event:any) {
    this.sendEvent(AgCellRendererEvent.EDIT_EVENT);
  }
  
}
/* }
  
} */