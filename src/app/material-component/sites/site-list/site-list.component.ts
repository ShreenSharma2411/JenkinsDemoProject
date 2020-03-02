import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { CrudActionComponent } from '../../../shared/renderers/crud-action/crud-action.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModalComponent } from '../../../shared/common-modal/common-modal/common-modal.component';
import { LinkRendererComponent } from '../../../shared/renderers/link-renderer/link-renderer.component';
import { AgCellRendererEvent } from '../../../shared/renderers/ag-cell-renderer.event';
import { SiteDetailsService } from '../site-details.service';
import { Observable,of} from 'rxjs';



@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {

  titlePage = 'Sites';
  gridApi: GridApi;
  columnDefs;
  context;
  frameworkComponents;
  previousSites: any[] = [];
  rowData: Observable<any[]>;
  searchString;

  constructor(private router: Router, private route: ActivatedRoute, private modalService: NgbModal,
    private siteService: SiteDetailsService) {

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
      case AgCellRendererEvent.LINK:
        /*   this.editSites(data); */
        break;
      case AgCellRendererEvent.EDIT_EVENT:
        //this.editUserById(data);
        break;
      case AgCellRendererEvent.DELETE_EVENT:
        this.deleteSiteById(data.siteId);
        break;
      case AgCellRendererEvent.VIEW_EVENT:
        // this.viewSites(data)
        break;
    }
  }

  ngOnInit() {
    debugger
    this.siteService.getAllSites().subscribe(prevSites => {
      this.rowData = of(prevSites);
      this.previousSites = prevSites
    })
  }

  initGrid() {

    this.columnDefs = [
      {
        headerName: 'Site Name',
        field: 'siteName',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true
      },

      {
        headerName: 'Site Description',
        field: 'siteDesc'
      },

      {
        headerName: 'Site Location',
        field: 'siteLocation'
      },

      {
        headerName: 'Status',
        field: 'status'
      },

      {
        headerName: 'Action',
        cellRenderer: 'crudActionRenderer'
      }

    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  onSearch() {
    this.gridApi.setQuickFilter(this.searchString);
  }

  addSites() {
    this.router.navigateByUrl('/create-site')
  }

  deleteSiteById(siteid: any) {
    debugger
    const activeModal = this.modalService.open(CommonModalComponent, { size: 'sm' });
    activeModal.componentInstance.showHide = false;
    activeModal.componentInstance.modalHeader = 'Alert';
    activeModal.componentInstance.modalContent = 'Are you sure you want to Delete this Site?';
    activeModal.result.then(res => {
      if (res == 'Y') {
        this.siteService.deleteSites(siteid).subscribe(data => {
          console.log(data);
        }, error => {
          this.ngOnInit();
        })
      }
    })
  }

  viewSites(siteid) {
    this.router.navigate(['/create-site', this.viewSites], { relativeTo: this.route });
  }

}
