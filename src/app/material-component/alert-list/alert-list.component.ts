import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CrudActionComponent } from '../../shared/renderers/crud-action/crud-action.component';
import { AgCellRendererEvent } from '../../shared/renderers/ag-cell-renderer.event';
import { CommonModalComponent } from '../../shared/common-modal/common-modal/common-modal.component';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements OnInit {

  titlePage = 'Alerts';
  showInputText: boolean = false;
  selectedAlertIds: number[] = [];
  previousAlertAsset: any[];
  searchString: string;
  assetChange: string;
  showFilterPanel: boolean = false;
  filterButtonName = 'Advance Search'

  // ag-grid
  gridApi: GridApi;
  columnDefs;
  context;
  frameworkComponents;
  public rowData: any[];
  errorMessage;

  onSearch() {

    this.gridApi.setQuickFilter(this.searchString);
  }

  //Form Controls
  assignee = new FormControl('', Validators.required);

  constructor(private router: Router, private route: ActivatedRoute, private ngbModal: NgbModal) {

    this.context = {
      componentParent: this,
      editButton: true,
      deleteButton: true
    };

    this.frameworkComponents = {
      crudActionRenderer: CrudActionComponent
    }
  }

  ngOnInit() {
    this.initGrid();
  }


  initGrid() {
    this.columnDefs = [
      {
        field: "alertId",
        headerName: "Id",
        resizable: true,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
      },
      {
        field: "assetClass",
        headerName: "Asset Class",
        resizable: true
      },
      {
        field: "assetName",
        headerName: "Asset Name",
        resizable: true,
        getQuickFilterText: function (params) {
          return params.value.name;
        }
      },
      {
        field: "alertDesc",
        headerName: "Alert Description",
        resizable: true
      },
      {
        field: "assignedTo",
        headerName: "Assigned To",
        resizable: true
      },
      {
        field: "status",
        headerName: "Status",
        resizable: true
      },
      {
        field: "createdDate",
        headerName: "Created Time",
        resizable: true,
        valueFormatter: params => params.value ? params.value : '-',
      }

      // {
      //   field: "actions",
      //   cellRenderer: 'crudActionRenderer',
      //   headerName: "Actions",
      //   width: 450,
      //   resizable: true
      // },
    ]

    this.rowData = [
      // assetnamme : pump,motor,main motor,hyraulic pump,oil
      { alertId: '1', assetClass: 'Hydraulic Pump', assetName: 'Pump01', alertDesc: 'Pressure is High', assignedTo: 'Mary', status: 'Dismissed', createdDate: '02/08/2019' },
      { alertId: '2', assetClass: 'Pump', assetName: 'Pump02', alertDesc: 'Pressure is Low', assignedTo: 'Jack', status: 'Closed', createdDate: '05/05/2019' },
      { alertId: '3', assetClass: 'Hydraulic Pump', assetName: 'Pump02', alertDesc: 'Pressure is High', assignedTo: 'Maria', status: 'Not Yet Fixed', createdDate: '06/06/2019' },
      { alertId: '4', assetClass: 'Oil', assetName: 'Oil-x', alertDesc: 'Temerature is lower than threshold', assignedTo: 'Maria', status: 'Dismissed', createdDate: '02/08/2019' },
      { alertId: '5', assetClass: 'Motor', assetName: 'Motor01', alertDesc: 'Revolution are Higher', assignedTo: 'Mary', status: 'Not Yet Fixed', createdDate: '22/05/2019' },
      { alertId: '6', assetClass: 'Hydraulic Pump', assetName: 'Pump02', alertDesc: 'Pressure is High', assignedTo: 'Jack', status: 'Closed', createdDate: '21/08/2019' },
      { alertId: '7', assetClass: 'Oil', assetName: 'Oil-Y', alertDesc: 'Temerature is lower than threshold', assignedTo: 'Maria', status: 'Not Yet Fixed', createdDate: '19/08/2019' },
      { alertId: '8', assetClass: 'Motor', assetName: 'Motor02', alertDesc: 'Revolution are Higher', assignedTo: 'Mary', status: 'Closed', createdDate: '02/04/2019' },
      { alertId: '9', assetClass: 'Hydraulic Pump', assetName: 'Pump03', alertDesc: 'Pressure is High', assignedTo: 'Jack', status: 'Dismissed', createdDate: '15/07/2019' },
      { alertId: '10', assetClass: 'Oil', assetName: 'Oil-Z', alertDesc: 'Temerature is lower than threshold', assignedTo: 'Maria', status: 'Not Yet Fixed', createdate: '02/08/2019' },
      { alertId: '11', assetClass: 'Motor', assetName: 'Motor04', alertDesc: 'Revolution are Higher', assignedTo: 'Mary', status: 'Closed', createdDate: '11/08/2019' },
      { alertId: '12', assetClass: 'Oil', assetName: 'Oil-F', alertDesc: 'Temerature is lower than threshold', assignedTo: 'Jack', status: 'Dismissed', createdDate: '02/10/2019' },
      { alertId: '13', assetClass: 'Motor', assetName: 'Motor05', alertDesc: 'Revolution are Higher', assignedTo: 'Maria', status: 'Dismissed', createdDate: '10/04/2019' },
      { alertId: '14', assetClass: 'Hydraulic Pump', assetName: 'Pump05', alertDesc: 'Pressure is High', assignedTo: 'Jack', status: 'Not Yet Fixed', createdDate: '12/08/2019' },

    ];
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
        //  this.deleteUserById(data);
        break;
    }
  }

  showAlert(flag: boolean): NgbModalRef {
    const activeModal = this.ngbModal.open(CommonModalComponent, { size: 'lg' });
    activeModal.componentInstance.showHide = flag;
    activeModal.componentInstance.modalHeader = 'Alert';
    return activeModal;
  }

  performAction(status: string) {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
      const activeModal = this.showAlert(true);
      if (status == 'dismiss') {
        activeModal.componentInstance.modalContent = 'Are you sure want to Dismiss this Alerts?';
        activeModal.componentInstance.showInputText = true;
        activeModal.componentInstance.placeholderContent = 'Enter Comment';
      } else if (status == 'assign') {
        if (selectedRows.every((val, i, arr) => val.assetName === arr[0].assetName)) {
          activeModal.componentInstance.modalContent = 'Do you want to Assign selected Alerts?'
        } else {
          this.gridApi.deselectAll();
          activeModal.componentInstance.modalContent = 'Alerts cannot be assigned with different Asset Names';
          activeModal.componentInstance.showHide = false;
          return;
        }
      }

      activeModal.result.then(res => {
        //res will be commented text if provided else 
        if (res != 'N') {
          if (status == 'dismiss') {
            console.log(res);
          } else if (status == 'close') {
            console.log(res);
          } else if (status == 'assign') {
            this.router.navigate(['/create-case-alert'], { queryParams: this.selectedAlertIds });
          }
        }
      });
    } else {
      this.errorMessage = 'Please select an alert to perform an action';
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
    }
  }

  onRowSelected() {
    this.selectedAlertIds = [];
    const selectedIds = this.gridApi.getSelectedRows();
    for (let i = 0; i < selectedIds.length; i++) {
      this.selectedAlertIds.push(selectedIds[i].alertId);
    }
  }

  clearFilter() {

  }

  searchFilter() {

  }

  filterButton() {
    if (this.showFilterPanel == false) {
      this.filterButtonName = 'Hide Filters'
      this.showFilterPanel = true;
    } else {
      this.filterButtonName = 'Advance Search'
      this.showFilterPanel = false;
    }
  }
}
