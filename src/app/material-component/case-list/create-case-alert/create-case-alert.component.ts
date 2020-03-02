import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { GridApi } from 'ag-grid-community';
import { CrudActionComponent } from '../../../shared/renderers/crud-action/crud-action.component';
import { AgCellRendererEvent } from '../../../shared/renderers/ag-cell-renderer.event';
import { CommonModalComponent } from '../../../shared/common-modal/common-modal/common-modal.component';
import { CaseListService } from '../case-list.service';


@Component({
  selector: 'app-create-case-alert',
  templateUrl: './create-case-alert.component.html',
  styleUrls: ['./create-case-alert.component.scss'],
})
export class CreateCaseAlertComponent implements OnInit {

  gridApi: GridApi;
  columnDefs;
  rowData: any[] = [];
  defaultColDef;
  context;
  frameworkComponents;

  errorMsg: string;
  isLoading = false;
  upDateAccess: boolean;
  isView = false;
  selectedrowdta: any;
  successMessage: string;
  // categories: Observable<any[]>;
  assigneeNameList: any[] = [];
  selectedIds: string[] = [];
  selectedAlertIds: number[] = [];
  sampleRowData: any[];
 
  titlePage = 'Create Case';
  assetAssignForm: FormGroup;
  public desc: AbstractControl;
  public priority: AbstractControl;
  public assigne: AbstractControl;
  public comments: AbstractControl;
  public assigneeParameters: AbstractControl;
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  // assigneeId = new FormControl('', [Validators.required]);
  // assigne = new FormControl('', Validators.required);

  assignees: any[] = [
    { assigneeName: 'Marcus Colletrell' },
    { assigneeName: 'Steven Phillips' },
  ];


  constructor(private router: Router, private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private location: Location,
    private caseListService: CaseListService) {


    
    this.createForm();

    this.initGrid();
    this.context = {
      componentParent: this,
      deleteButton: true
    };
    this.frameworkComponents = {
      crudActionRenderer: CrudActionComponent
    }


    // this.defaultColDef = {
    //   editable: true,
    //   resizable: true
    // };
  }

  handleAgRendererEvent(event: AgCellRendererEvent) {

    const data = event.params.data;
    console.log(event.type + " event type");
    switch (event.type) {
      // case AgCellRendererEvent.EDIT_EVENT:
      //   this.editUserById(data);
      //   break;
      case AgCellRendererEvent.DELETE_EVENT:
        this.deleteUserById(data);
        break;
    }
  }

  ngOnInit() {
    this.sampleRowData = [
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
      { alertId: '14', assetClass: 'Hydraulic Pump', assetName: 'Pump05', alertDesc: 'Pressure is High', assignedTo: 'Jack', status: 'Not Yet Fixed', createdDate: '12/08/2019' }

    ];

    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.rowData = [];                             //
      Object.values(params).forEach(element => {
        this.rowData = this.rowData.concat(this.sampleRowData.filter(res => res.alertId == element));
      });
      console.log(this.rowData)

    })

    this.caseListService.getAllUsers().subscribe(prevAssignee => {
      this.assigneeNameList = prevAssignee;
      // this.previousAssignee = prevAssignee     
    })
  }

  initGrid() {

    this.columnDefs = [

      { headerName: 'Alert Id', field: 'alertId' },
      { headerName: 'Asset Class', field: 'assetClass' },
      { headerName: 'Asset Name', field: 'assetName' },
      { headerName: 'Alert Description', field: 'alertDesc' },
      { headerName: 'Action', cellRenderer: 'crudActionRenderer' }
    ];

    // this.rowData = [
    //   { assestClass: 'Motor', assetName: 'Fire', alertDesc: 'Pressure is high' },
    //   { assestClass: 'Hydrolic Pump', assetName: 'Insights Secure', alertDesc: 'Pressure is low' },
    //   { assestClass: 'Main Motor', assetName: 'Ethics', alertDesc: 'Resolution is high' }
    // ];
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setRowData(this.rowData);
  }


  back() {
    this.router.navigateByUrl('/alert-list')
  }

  showAlert(flag: boolean): NgbModalRef {
    const activeModal = this.modalService.open(CommonModalComponent, { size: 'sm' });
    activeModal.componentInstance.showHide = flag;
    activeModal.componentInstance.modalHeader = 'Confirm';
    return activeModal;
  }

  assignAlert() {
    // this.loading = false;
    const activeModal = this.showAlert(false);
    activeModal.componentInstance.modalContent = 'Alerts are assigned with case id: 12';
  }

  debugger;
  deleteUserById(data) {

    const i = this.rowData.indexOf(data.alertId)
    this.rowData.splice(i, 1);
    this.gridApi.setRowData(this.rowData);

    if (this.rowData.length == 0) {
      const activeModal = this.showAlert(false);
      activeModal.componentInstance.modalContent = 'All the selected alerts has been deleted. Please select alerts to assign';
      activeModal.result.then(res => {
        if (res == 'Y') {
          this.router.navigate(['/alert-list']);
        }
      });
    }

  }


  handleBack() {
    this.location.back();
  }

  addParameter() {
    const control = <FormArray>this.assetAssignForm.controls['parameters'];
    control.push(this.initParameter());
  }

  removeParameter(i: number) {
    const control = <FormArray>this.assetAssignForm.controls['parameters'];
    control.removeAt(i);
  }

  initParameter() {
    return this.fb.group({
      assigneeId: ['', Validators.required],
      assigneeComment: ['']
    });
  }

  private createForm() {

    this.assetAssignForm = this.fb.group({
      'desc': ['', Validators.compose([Validators.required])],
      'priority': ['', Validators.compose([Validators.required])],
      'assigne': ['', Validators.compose([Validators.required])],
      'comments': ['', Validators.compose([Validators.required])],
      'parameters': this.fb.array([this.initParameter()])
    });

    this.desc = this.assetAssignForm.controls['desc'];
    this.priority = this.assetAssignForm.controls['priority'];
    this.assigne = this.assetAssignForm.controls['assigne'];
    this.comments = this.assetAssignForm.controls['comments'];
    this.assigneeParameters = this.assetAssignForm.controls['parameters'];

    this.assigneeParameters.valueChanges.subscribe(data => {
      this.selectedIds = [];
      data.forEach(parameter => {
        this.selectedIds.push(parameter.assigneeId);
      });

    });

  }
  // onRemoveSelected() {
  //   var selectedData = this.gridApi.getSelectedRows();
  //   var res = this.gridApi.updateRowData({ remove: selectedData });
  // }


  // onRowSelected() {
  //   this.selectedAlertIds = [];
  //   const selectedRolesIds: any[] = this.gridApi.getSelectedRows();

  //   for (let i = 0; i < selectedRolesIds.length; i++)
  //     this.selectedAlertIds.push(selectedAlertIds[i].alertId);

  // }
}
