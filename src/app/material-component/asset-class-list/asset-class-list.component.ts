import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAssetClassComponent } from './create-asset-class/create-asset-class.component';
import { LinkRendererComponent } from '../../shared/renderers/link-renderer/link-renderer.component';
import { CrudActionComponent } from '../../shared/renderers/crud-action/crud-action.component';
import { AgCellRendererEvent } from '../../shared/renderers/ag-cell-renderer.event';
import { Observable,of } from 'rxjs';
import { AssetClassService } from './asset-class.service';
import { CommonModalComponent } from '../../shared/common-modal/common-modal/common-modal.component';

@Component({
  selector: 'app-asset-class',
  templateUrl: './asset-class-list.component.html',
  styleUrls: ['./asset-class-list.component.scss']
})
export class AssetClassComponent implements OnInit {

  titlePage = 'Asset Class';
  gridApi: GridApi;
  columnDefs;
  context;
  frameworkComponents;
  previousAssetClass: any [] = [];
  rowData: Observable<any[]>;
  searchString;
  errorMsg;

  onSearch() {
    this.gridApi.setQuickFilter(this.searchString);
  }

  constructor(private modalService: NgbModal, private assetClassService:AssetClassService) {

    this.initGrid();

    this.context = {
      componentParent: this,
      editButton: true,
      deleteButton: true,
      viewButton: true,
    };

    this.frameworkComponents = {
      linkRenderer: LinkRendererComponent,
      crudActionRenderer: CrudActionComponent
    }
  }

  handleAgRendererEvent(event: AgCellRendererEvent) {

    const data = event.params.data;
    console.log(event.type + " event type");
    switch (event.type) {
      case AgCellRendererEvent.EDIT_EVENT:
        //this.editUserById(data);
        break;
      case AgCellRendererEvent.DELETE_EVENT:
        this.deleteAssetClass(data.assetClassId);
        break;
      case AgCellRendererEvent.VIEW_EVENT:
        // this.viewSites(data)
        break;
    }
  }

  ngOnInit() {
   

    this.assetClassService.getAllAssetClass().subscribe(prevAssetClass => {
      this.rowData = of(prevAssetClass);
      this.previousAssetClass = prevAssetClass   
    }) 
  }

  initGrid() {
    this.columnDefs = [
    
      {
        
        headerName: "Asset Class Name",
        field: 'assetClassName',
        resizable: true,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true 

      },
      {
       
        headerName: "Asset Class Description",
        field: 'assetClassDesc',
        resizable: true

      },
      {
        headerName: 'Action',
        cellRenderer: 'crudActionRenderer'
      },
    ]
    /* this.rowData = [
      { assetClassId: '1', assetClass: 'Hydraulic Pump', desc: 'Pressure is High' },
      { assetClassId: '2', assetClass: 'Pump', desc: 'Pressure is Low', },
      { assetClassId: '3', assetClass: 'Hydraulic Pump', desc: 'Revolution are Higher' },
      { assetClassId: '4', assetClass: 'Oil', desc: 'Temerature is lower than threshold' },
      { assetClassId: '5', assetClass: 'Motor', desc: 'Pressure is High', },
      { assetClassId: '6', assetClass: 'Hydraulic Pump', desc: 'Revolution are Higher' },
      { assetClassId: '7', assetClass: 'Oil', desc: 'Temerature is lower than threshold' },
      { assetClassId: '8', assetClass: 'Motor', desc: 'Pressure is Low' }
    ]; */
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }


  deleteAssetClass(assetClassId:number) {
    debugger
    const activeModal = this.modalService.open(CommonModalComponent, { size: 'sm' });
    activeModal.componentInstance.showHide = false;
    activeModal.componentInstance.modalHeader = 'Alert';
    activeModal.componentInstance.modalContent = 'Are you sure you want to Delete this Site?';
    activeModal.result.then(res => {
      if (res == 'Y') {
        this.assetClassService.deleteAssetClass(assetClassId).subscribe(data => {
         
          console.log(data);
        }, error => {
          this.ngOnInit();
        })
      }
    })
  };
  

  createAssetClass() {

    const activeModal = this.modalService.open(CreateAssetClassComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'Add Asset Class';
    activeModal.componentInstance.actionBtnLabel = 'Save';
    activeModal.result;
    activeModal.componentInstance.emitService.subscribe(res => {
      if (res == 'Y')
        this.ngOnInit();
    }, errorMessage => this.errorMsg = errorMessage);
  }

  


  }

