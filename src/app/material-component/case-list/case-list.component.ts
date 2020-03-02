import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModalComponent } from '../../shared/common-modal/common-modal/common-modal.component';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {

  titlePage = 'Cases';
  showFilterPanel: boolean = false;
  filterButtonName = 'Advance Search'

  public searchString: string

  gridApi: GridApi;
  columnDefs;
  rowData: any;
  errorMessage;
  defaultColDef;

  

  

  constructor(private modalService: NgbModal) {

    this.initGrid();

    
  this.defaultColDef = {
    editable: true,
    resizable: true
  };

  }

  ngOnInit() {
  }

  initGrid() {
    this.columnDefs = [
      {
        headerName: 'Id', field: 'id', headerCheckboxSelection: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true
      },
      { headerName: 'Asset Class', field: 'assetClass', width: 200},
      { headerName: 'Asset Name', field: 'assestName' },
      { headerName: 'Case Description', field: 'caseDesc', width: 250 },
      { headerName: 'Priority', field: 'priority' },
      { headerName: 'Status', field: 'status' },
      { headerName: 'Assigned To', field: 'assignTo', width: 200 },
      { headerName: 'Created Time', field: 'createdDate', width: 200, valueFormatter: params => params.value ? params.value : '-'},
    ];

    this.rowData = [
      { id: 1, assestName: 'Motor', caseDesc: 'Fire', priority: 1, status: 'Open', assignTo: 'abc', createdDate:'10/05/2019' },
      { id: 2, assestName: 'Hydrolic Pump', caseDesc: 'Insights Secure', priority: 1, status: 'Closed', assignTo: 'abc',createdDate:'05/05/2019' },
      { id: 3, assestName: 'Main Motor', caseDesc: 'Ethics', priority: 1, status: 'Closed', assignTo: 'Pankaj',createdDate:'10/01/2019' },
      { id: 4, assestName: 'Pump', caseDesc: 'Ethics And Integrity', priority: 3, status: 'Open', assignTo: 'abc',createdDate:'13/05/2019' },
      { id: 5, assestName: 'Motor 1', caseDesc: 'Ethics', priority: 4, status: 'Closed', assignTo: 'abc',createdDate:'10/02/2019' },
      { id: 6, assestName: 'Pump 2', caseDesc: 'Ethics And Aptitude', priority: 6, status: 'Open', assignTo: 'Pankaj',createdDate:'18/11/2019' },
      { id: 7, assestName: 'Motor 3', caseDesc: 'Emotional Intelligence', priority: 1, status: 'Closed', assignTo: 'abc',createdDate:'10/12/2019' },
      { id: 8, assestName: 'Oil', caseDesc: 'Moral Attitude', priority: 1, status: 'Open', assignTo: 'ths',createdDate:'22/05/2019' },
      { id: 9, assestName: 'Pump 1', caseDesc: 'Decision Making', priority: 2, status: 'Open', assignTo: 'abc',createdDate:'10/10/2019' },
      { id: 10, assestName: 'Motor 2', caseDesc: 'Honesty And Integrity', priority: 1, status: 'Closed', assignTo: 'uuu',createdDate:'24/07/2019' },
      { id: 11, assestName: 'Hydrolic Pump', caseDesc: 'Emotional Intelligence', priority: 5, status: 'Closed', assignTo: 'xyz',createdDate:'10/05/2019' },
      { id: 12, assestName: 'Pump 3', caseDesc: 'Insights Secure', priority: 1, status: 'Closed', assignTo: 'abc',createdDate:'23/05/2019' },
      { id: 13, assestName: 'Hydrolic Pump', caseDesc: 'Ethics', priority: 1, status: 'Open', assignTo: 'Pankaj',createdDate:'10/08/2019' },

    ];

  }
  // onSearch() {
  // var x = document.getElementById("myInput");
  // }
  onSearch() {
    this.gridApi.setQuickFilter(this.searchString);
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  dismissAlert(status: string)  {
    debugger;
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {

      const activeModal = this.modalService.open(CommonModalComponent);
      activeModal.componentInstance.showHide = true;
      activeModal.componentInstance.modalHeader = 'Confirm';
      if (status == 'close') {
        activeModal.componentInstance.modalContent = 'Do you want to close the selected cases?';
        activeModal.result.then(res => {
          if (res === 'Y') {
            for (let sel of selectedRows) {
              const id = (sel.id - 1).toString();
              var rowNode = this.gridApi.getRowNode(id);
              rowNode.setDataValue("status", 'Closed');
              this.gridApi.deselectAll();
            }
          }
        });
      } else if (status == 'dismiss') {
        activeModal.componentInstance.modalContent = 'Do you want to delete the selected cases?';
        activeModal.result.then(res => {
          if (res === 'Y') {
            const res = this.gridApi.updateRowData({ remove: selectedRows });
          }
        });
      }else if(status == 'assign'){
        activeModal.componentInstance.modalContent = 'Do you want to assign a case?';
      }
    } else {
      this.errorMessage = 'Please select a case to perform an action';
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
    }
  }
  clearFilter(){

  }
  
  searchFilter(){
  
  }
  filterButton(){
    if(this.showFilterPanel == false){
      this.filterButtonName = 'Hide Filters'
      this.showFilterPanel = true;
    } else {
      this.filterButtonName = 'Advance Search'
      this.showFilterPanel = false;
    }
  }
}
