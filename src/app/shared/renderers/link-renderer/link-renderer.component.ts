import { Component } from '@angular/core';
import { AgCellRendererBase } from '../ag-cell-renderer-base';
import { AgCellRendererEvent } from '../ag-cell-renderer.event';

@Component({
  selector: 'app-link-renderer',
  templateUrl: './link-renderer.component.html',
  styleUrls: ['./link-renderer.component.scss']
})
export class LinkRendererComponent extends AgCellRendererBase {

  isWorkflowlocked: boolean;
  canEdit: boolean=true;

  constructor() {
    super();
  }

  
  ngOnInit(){
    var currentUserId = sessionStorage.getItem('currentUserId');
    if(this.params.data.lockedByUserId > 0 ){
      this.isWorkflowlocked = true;
      if(parseInt(currentUserId) === this.params.data.lockedByUserId){
       this.canEdit = true;
      }else {
        this.canEdit = false;
      }
    }else{
      this.isWorkflowlocked = false;
      this.canEdit = true;
    }
  }

  onLink(event: MouseEvent) {
    this.sendEvent(AgCellRendererEvent.LINK, event);
  }

}
