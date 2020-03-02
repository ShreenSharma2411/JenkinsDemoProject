import { Routes } from '@angular/router';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UserRoleComponent } from './users/user-role/user-role.component';
import { RolesComponent } from './users/roles/roles.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { AlertListComponent } from './alert-list/alert-list.component';
import { AssetClassComponent } from './asset-class-list/asset-class-list.component';
import { CreateAssetClassComponent } from './asset-class-list/create-asset-class/create-asset-class.component';
import { CaseListComponent } from './case-list/case-list.component';
import { CreateCaseAlertComponent } from './case-list/create-case-alert/create-case-alert.component';
import { CreateSiteComponent } from './sites/create-site/create-site.component';
import { SiteListComponent } from './sites/site-list/site-list.component';
import { UserTableComponent } from './users/user-table/user-table.component';

export const MaterialRoutes: Routes = [
  {
    path: 'alert-list',
    component: AlertListComponent
  },
  {
    path: 'create-case-alert',
    component: CreateCaseAlertComponent,

  },
  {
    path: 'users',
    component: CreateUserComponent
  },
  {
    path: 'user-table',
    component: UserTableComponent
  },
  {
    path: 'asset-list',
    component: AssetListComponent
  },
  {
    path: 'asset-class-list',
    component: AssetClassComponent
  },

  {
    path: 'create-asset-class',
    component: CreateAssetClassComponent
  },
  {
  path: 'user-role',
  component: UserRoleComponent
},
{
  path: 'create-site',
  component: CreateSiteComponent
},
{
  path: 'case-list',
  component: CaseListComponent
},
{
  path: 'site-list',
  component: SiteListComponent
},
{
  path: 'roleList',
  component: RolesComponent
},
{
  path: 'userProfile',
  component: UserProfileComponent
}

];
