import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { CrudActionComponent } from '../../../shared/renderers/crud-action/crud-action.component';
import { CommonModalComponent } from '../../../shared/common-modal/common-modal/common-modal.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AgCellRendererEvent } from '../../../shared/renderers/ag-cell-renderer.event';
import { Observable,of } from 'rxjs';
import { UserListService } from '../user-list.service';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  titlePage = 'Users';
  gridApi: GridApi;
  columnDefs;
  context;
  frameworkComponents;
  previousUsers: any[] = [];
  rowData: Observable<any[]>;
  searchString;


  constructor( private router: Router, private route: ActivatedRoute, private modalService: NgbModal,
    private service:UserListService) { 

    this.initGrid();

    this.context = {
      componentParent: this,
      editButton: true,
      deleteButton: true,
      activeButton:true,
      isActive: this.columnDefs[4].field
    };

    this.frameworkComponents = {
     
      crudActionRenderer: CrudActionComponent
    }
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
          this.deleteUserById(data);
        break;
      case AgCellRendererEvent.ACTIVE_EVENT:
         this.activateUserById(data);
       break;
    }
  }

  ngOnInit() {
    debugger
    this.service.getAllUsers().subscribe(prevUser => {
      this.rowData = of(prevUser);
      this.previousUsers = prevUser
    })
  }
    
  

  initGrid() {
    this.columnDefs = [
      {headerName: 'Name',
      field: 'userName',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true },

      
     

      {headerName: 'Email',
       field: 'userName' },

       {headerName: 'Country Code',
       field: 'countryCode' },


      {headerName: 'Mobile No',
       field: 'userMobile'},

    

      {headerName: 'Status',
       field: 'isActive' ,
       valueFormatter: params => params.value ? 'Active' : 'Inactive'},

      {headerName: 'Action',
      cellRenderer: 'crudActionRenderer'}
  ];

/*   this.rowData = [
    { name: 'Shubham', email: 'S@gmail.com', mobile: 8976464773, role: 'Technician' },
    { name: 'Alok', email: 'ab@gmail.com', mobile: 8467928332, role: 'Supervisor'},
    { name: 'Vishal', email: 'V@gmail.com', mobile: 8746746443, role: 'Admin' },
    { name: 'Rohit', email: 'R@gmail.com', mobile: 8748986443, role: 'Supervisor' },
    { name: 'Pushpak', email: 'P@gmail.com', mobile: 8748980043, role: 'Supervisor'}
]; */

  }

    onGridReady(params: any) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }
  onSearch() {
    this.gridApi.setQuickFilter(this.searchString);
  }


  deleteUserById(data){
    const activeModal = this.modalService.open(CommonModalComponent, { size: 'sm' });
    activeModal.componentInstance.showHide = false;
    activeModal.componentInstance.modalHeader = 'Alert';
    activeModal.componentInstance.modalContent = 'Are you sure you want to Delete the User?';
  }

  activateUserById(data: any) {
    const activeModal = this.modalService.open(CommonModalComponent, { size: 'sm'});
    activeModal.componentInstance.showHide = false;
    activeModal.componentInstance.oKMessage = 'Yes';
    activeModal.componentInstance.modalHeader = 'Alert';
    if(data.status) {
      activeModal.componentInstance.modalContent = 'Are you sure you wnat to deactivate the user?' 
                                                  + '<br/>'
                                                  + '<br/>'
                                                  + 'Selected user : '
                                                  + '<b>'
                                                  + data.name
                                                  + '</b>';
    } else {
      activeModal.componentInstance.modalContent = 'Are you sure you want to activate the user?' 
                                                  + '<br/>'
                                                  + '<br/>'
                                                  + 'Selected user : '
                                                  + '<b>'
                                                  + data.name
                                                  + '</b>';
    }
    // activeModal.result.then(res => {
    //   if (res == 'Y') {
    //     this.userService.deleteUser(data.userId).subscribe( resp => {
    //       this.userService.getUsers().subscribe((data) => {
    //         this.rowData$= of(data);
    //       });
    //     });
    //   }
    // });
 }
 addUser(){
  this.router.navigateByUrl('/users')
}
}

