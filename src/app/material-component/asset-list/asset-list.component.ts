import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { GridApi } from 'ag-grid-community';
import { LinkRendererComponent } from '../../shared/renderers/link-renderer/link-renderer.component';
import { CrudActionComponent } from '../../shared/renderers/crud-action/crud-action.component';
import { AgCellRendererEvent } from '../../shared/renderers/ag-cell-renderer.event';
import { CommonModalComponent } from '../../shared/common-modal/common-modal/common-modal.component';
import { AssetListService } from './asset-list.service';
import { of, Observable } from 'rxjs';
import { AssetClassService } from '../asset-class-list/asset-class.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {

  titlePage = 'Asset List';
  showInputText: boolean = false;
  selectedAlertIds: number[] = [];
  previousAlertAsset: any[];

  // ag-grid
  gridApi: GridApi;
  columnDefs;
  context;
  frameworkComponents;
  rowData: Observable<any[]>;
  assetClassList: any[] = [];
  previousAssets: any [] = [];
  previousAssetClass: any[] = [];
  searchString;

  onSearch(){
    this.gridApi.setQuickFilter(this.searchString);
  }

  //Form Controls
  assignee = new FormControl('', Validators.required);

  constructor(private router: Router,
     private route: ActivatedRoute,
     private modalService: NgbModal,
     private assetListService: AssetListService) {

    this.context = {
      componentParent: this,
      editButton: true,
      deleteButton: true
    };

    this.frameworkComponents = {
      linkRenderer: LinkRendererComponent,
      crudActionRenderer: CrudActionComponent,
    }
  }


  ngOnInit() {
    this.initGrid();
    this.assetListService.getAllAssets().subscribe(assetList => {
      this.rowData = of(assetList);
      this.previousAssets = assetList     
    })

    this.assetListService.getAllAssetClass().subscribe(assetsList => {
      this.assetClassList = assetsList;
      //this.previousAssetClass = assetsList     
    })
  }


  initGrid() {
    this.columnDefs = [
      {
        field: "assetClass",
        headerName: "Asset Class",
        resizable: true,
     
      },
      {
        field: "assetName",
        headerName: "Asset Name",
        resizable: true

      },
      {
        field: "assetDesc",
        headerName: "Asset Decription",
        resizable: true

      },
      {
        field: "status",
        headerName: "Status",
        resizable: true
      },
      {
        headerName: "Information",
        resizable: true,
        valueSetter: "Cases | Alerts"

      },
      // {
      //   field: "actions",
      //   cellRenderer: 'crudActionRenderer',
      //   headerName: "Actions",
      //   width: 450,
      //   resizable: true
      // },
    ];

    // this.rowData = [
    //   { info: 'Cases | Alerts' },
    //   { info: 'Cases | Alerts'  },
    //   { info: 'Cases | Alerts'},
    //   { info: 'Cases | Alerts' },
    //   { info: 'Cases | Alerts' },
    //   { info: 'Cases | Alerts'},
    //   { info: 'Cases | Alerts' },
    //   { info: 'Cases | Alerts' },
    //   { info: 'Cases | Alerts' },
    //   { info: 'Cases | Alerts' },
     

    // ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();

  }


  handleAgRendererEvent(event: AgCellRendererEvent) {

    const data = event.params.data;
    console.log(event.type + " event type");
    switch (event.type) {
      //  case AgCellRendererEvent.VIEW_EVENT:
      //    this.viewUserById(data);
      //   break;
      case AgCellRendererEvent.EDIT_EVENT:
        //this.editUserById(data);
        break;
      case AgCellRendererEvent.DELETE_EVENT:
        //  this.deleteAssetById(data.assetsId);
        break;
    }
  }

  showAlert(flag: boolean): NgbModalRef {
    const activeModal = this.modalService.open(CommonModalComponent, { size: 'lg' });
    activeModal.componentInstance.showHide = flag;
    activeModal.componentInstance.modalHeader = 'Alert';
    activeModal.componentInstance.modalContent = 'Are you sure you want to Delete this Site?';
    return activeModal;
  }

  addAsset() {
    this.router.navigateByUrl('/createAsset')
  }

  // deleteAssetById(assetsId: any){

  //   const activeModal = this.modalService.open(CommonModalComponent, { size: 'sm' });
  //   activeModal.componentInstance.showHide = false;
  //   activeModal.componentInstance.modalHeader = 'Alert';
  //   activeModal.componentInstance.modalContent = 'Are you sure you want to Delete this Site?';
  // }

  // dismissAlert(status: string) {
  //   const activeModal = this.showAlert(true);
  //   activeModal.componentInstance.showInputText = true;
  //   activeModal.componentInstance.placeholderContent = 'Enter Comment';

  //   if (status == 'dismiss') {
  //     activeModal.componentInstance.modalContent = 'Are you sure want to Dismiss this Alerts?'
  //     // activeModal.componentInstance.placeholderContent = 'Enter Comment';
  //   } else if (status == 'close') {
  //     activeModal.componentInstance.modalContent = 'Are you sure want to Close this Alerts?';
  //     // activeModal.componentInstance.placeholderContent = 'Enter Comment';
  //   }

  //   activeModal.result.then(res => {
  //     if (res != 'N') {
  //       if (status == 'dismiss') {
  //         console.log(res);
  //       } else if (status == 'close') {
  //         console.log(res);
  //       }
  //     }
  //   })
  // }


}




