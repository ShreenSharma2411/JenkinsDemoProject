import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { CrudActionComponent } from './renderers/crud-action/crud-action.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CommonModalComponent } from './common-modal/common-modal/common-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LinkRendererComponent } from './renderers/link-renderer/link-renderer.component';
import { EditActionRendererComponent } from './renderers/edit-action-renderer/edit-action-renderer.component';
import { ButtonRendererComponent } from './renderers/button-renderer/button-renderer.component';



@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
   ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
  // CommonModalComponent
    CrudActionComponent,
    LinkRendererComponent,
    EditActionRendererComponent,
    ButtonRendererComponent,
    CommonModalComponent,
  
  ],
  entryComponents: [
    LinkRendererComponent,
    CrudActionComponent,
    EditActionRendererComponent,
    ButtonRendererComponent,
    EditActionRendererComponent,
    ButtonRendererComponent,
    CommonModalComponent
  ],

  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    AgGridModule,
    CommonModalComponent,
    CrudActionComponent,
    LinkRendererComponent,
    EditActionRendererComponent,
    ButtonRendererComponent
   ],

  providers: [ MenuItems ]
})
export class SharedModule { }
