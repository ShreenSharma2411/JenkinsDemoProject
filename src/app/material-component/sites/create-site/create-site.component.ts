import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { FormControl, Validators, AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudActionComponent } from '../../../shared/renderers/crud-action/crud-action.component';
import { CommonModalComponent } from '../../../shared/common-modal/common-modal/common-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { IfStmt } from '@angular/compiler';
import { AgCellRendererEvent } from '../../../shared/renderers/ag-cell-renderer.event';
import { SiteDetailsService } from '../site-details.service';





class SiteAssetCreation {
  siteName: string;
  location: string;
  description: string;
  assetClassId: string;
  assetClassName: string;
  assetName: string;
  assetDesc: string;
}


@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit {

  titlePage = 'Create New Site';

  addedsiteAssetIds: any[] = [];


  siteAssetsForm: FormGroup;
  siteAssetList: any[] = [];
  previousSites: any [] = [];
  // ag-grid
  gridApi: GridApi;
  columnDefs;
  context;
  frameworkComponents;
  rowData: any[] = [];
  errorMessage: string;
  successMessage: string;

  public siteName: AbstractControl;
  public siteLocation: AbstractControl;
  public siteDescription: AbstractControl;
  public siteStatus: AbstractControl;
  public assetClass: AbstractControl;
  public assetName: AbstractControl;
  public assetDesc: AbstractControl;


  /*   siteName = new FormControl('', [Validators.required, Validators.minLength(4)]);
    description = new FormControl('', [Validators.required, Validators.minLength(4)]);
    location = new FormControl('', [Validators.required, Validators.minLength(4)]);
   
  
    ErrorMessage() {
      return this.siteName.hasError('siteName') ? 'Not a valid SitetName' : '';
    }
    ErrMessage() {
      return this.description.hasError('description') ? 'Not a valid description' : '';
    }
    ErrorMsg() {
      return this.location.hasError('location') ? 'Not a valid location' : '';
    } */

  constructor(private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private modalService: NgbModal,
      private assetService: SiteDetailsService) {

    this.createForm();

  }

  ngOnInit() {

    this.initGrid();

    this.context = {
      componentParent: this,

      deleteButton: true
    };

    this.frameworkComponents = {
      crudActionRenderer: CrudActionComponent
    }

    this.assetService.getAllAssetClass().subscribe(prevSites => {
      this.siteAssetList = prevSites;
      this.previousSites = prevSites     
    })

  }

  handleAgRendererEvent(event: AgCellRendererEvent) {

    const data = event.params.data;
    console.log(event.type + " event type");
    switch (event.type) {
      // case AgCellRendererEvent.EDIT_EVENT:
      //   this.editUserById(data);
      //   break;
      case AgCellRendererEvent.DELETE_EVENT:
        this.deleteSiteAssetById(data);
        break;
    }
  }


  addAssets() {
    this.router.navigateByUrl('/createAsset')
  }

  deleteSiteAssetById(data) {
    debugger
    console.log(this.addedsiteAssetIds);
    const activeModal = this.modalService.open(CommonModalComponent, { size: 'sm' });
    activeModal.componentInstance.showHide = false;
    activeModal.componentInstance.modalHeader = 'Alert';
    activeModal.componentInstance.modalContent = 'Are you sure you want to Delete this?';

    activeModal.result.then(res => {
      if (res == 'Y') {



        const index = this.addedsiteAssetIds.findIndex(asset => data.assetClassId == asset.assetClassId)


        this.addedsiteAssetIds.splice(index, 1);
        this.gridApi.setRowData(this.addedsiteAssetIds);
        this.successMessage = 'Selected Asset Class Deleted Succesfully!';
        setTimeout(() => this.successMessage = null, 1000);
        console.log(this.addedsiteAssetIds);

      }

    }

    )
  }

  addSiteAssets() {

    
    
   /*  this.addedsiteAssetIds.push(siteAssets); */
    // this.rowData.push(siteAssets);
    // console.log(siteAssets);
    // console.log(this.rowData);
  /*   this.gridApi.setRowData(this.addedsiteAssetIds); */

    if (this.assetClass.value == null || this.assetName.value == null ||
        this.assetClass.value == '' || this.assetName.value.trim() == ''){

          const activeModal = this.modalService.open(CommonModalComponent, { size: 'sm' });
          activeModal.componentInstance.showHide = false;
          activeModal.componentInstance.modalHeader = 'Alert';
          activeModal.componentInstance.modalContent = 'Asset Class and Asset Name is required  !';
      } else {
        const siteAssets = new SiteAssetCreation();
        siteAssets.assetClassId = this.assetClass.value;
        siteAssets.assetClassName = this.siteAssetList.find(res => res.value == this.assetClass.value).title;
        siteAssets.assetName = this.assetName.value;
        siteAssets.assetDesc = this.assetDesc.value;
        if (this.addedsiteAssetIds.length > -1) {

          const itemIndex = this.addedsiteAssetIds.findIndex(item => {
               if (this.assetName.value == item.assetName) {
                 
                 return true;
               }
             });
             if (itemIndex >= 0) {
               const activeModal = this.modalService.open(CommonModalComponent, { size: 'sm' });
               activeModal.componentInstance.showHide = false;
               activeModal.componentInstance.modalHeader = 'Alert';
               activeModal.componentInstance.modalContent = 'Asset Name already exists!';
               return;
             }
       
           }
        this.addedsiteAssetIds.push(siteAssets); 
        this.gridApi.setRowData(this.addedsiteAssetIds); 
        this.siteAssetsForm.controls['assetClass'].reset();
        this.siteAssetsForm.controls['assetName'].reset();
        this.siteAssetsForm.controls['assetDesc'].reset();
        this.successMessage = 'Item Added Succesfully!';
        setTimeout(() => this.successMessage = null, 3000);
          }
      }
      

  

  debugger;



  initGrid() {

    this.columnDefs = [{
      headerName: 'Asset Class',
      field: 'assetClassName'
    },
    {
      headerName: 'Asset Name',
      field: 'assetName',
    },
    {
      headerName: 'Asset Description',
      field: 'assetDesc',
       valueFormatter: params => params.value ? params.value : '-',
    },
    {
      headerName: 'Actions',
      cellRenderer: 'crudActionRenderer',
     
    },

    ];

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();

  }

  private createForm() {
    this.siteAssetsForm = this.fb.group({
      'siteName': ['', [Validators.required]],
      'siteLocation': ['', [Validators.required]],
      'siteDescription': [''],
      'siteStatus': ['', [Validators.required]],
      'assetClass': [''],
      'assetName': [''],
      'assetDesc': ['']
    })

    this.siteName = this.siteAssetsForm.controls['siteName'];
    this.siteLocation = this.siteAssetsForm.controls['siteLocation'];
    this.siteDescription = this.siteAssetsForm.controls['siteDescription'];
    this.siteStatus = this.siteAssetsForm.controls['siteStatus']
    this.assetClass = this.siteAssetsForm.controls['assetClass'];
    this.assetName = this.siteAssetsForm.controls['assetName'];
    this.assetDesc = this.siteAssetsForm.controls['assetDesc'];

  }
}
