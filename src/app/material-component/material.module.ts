import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialRoutes } from './material.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule} from '../shared/shared.module';
import { CreateUserComponent } from './users/create-user/create-user.component';

import { UserRoleComponent } from './users/user-role/user-role.component';
import { RolesComponent } from './users/roles/roles.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AssetListComponent } from './asset-list/asset-list.component';

import { AssetClassComponent } from './asset-class-list/asset-class-list.component';
import { UniqParamPipe } from './case-list/create-case-alert/asset-detail/uniqParam.pipe';
import { AssetDetailComponent } from './case-list/create-case-alert/asset-detail/asset-detail.component';
import { CaseListComponent } from './case-list/case-list.component';
import { CreateAssetClassComponent } from './asset-class-list/create-asset-class/create-asset-class.component';
import { CreateCaseAlertComponent } from './case-list/create-case-alert/create-case-alert.component';
import { AlertListComponent } from './alert-list/alert-list.component';
import { SiteListComponent } from './sites/site-list/site-list.component';
import { CreateSiteComponent } from './sites/create-site/create-site.component';


import { AssetClassService } from './asset-class-list/asset-class.service';
import { UserListService } from './users/user-list.service';
import { UserTableComponent } from './users/user-table/user-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { SiteDetailsService } from './sites/site-details.service';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    NgbModule, 
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    AgGridModule.withComponents([]),
    SharedModule
  ],
  providers: [
    AssetClassService,
    SiteDetailsService,
    UserListService],
  entryComponents: [],
  declarations: [
    AlertListComponent,
    CreateCaseAlertComponent,
    AssetListComponent,
    CreateUserComponent,
    UserTableComponent,
    CreateAssetClassComponent,
    UserRoleComponent,
    CreateSiteComponent,
    CaseListComponent,
    SiteListComponent,
    RolesComponent,
    UserProfileComponent,
    AssetDetailComponent,
    UniqParamPipe ,
    AssetClassComponent
  ]
})
export class MaterialComponentsModule {}
