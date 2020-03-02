import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'users', type: 'link', name: 'Create User', icon: 'supervised_user_circle' },
  { state: 'user-role', type: 'link', name: 'User Role', icon: 'supervised_user_circle' },
  { state: 'user-table', type: 'link', name: 'User List', icon: 'supervised_user_circle' },
  { state: 'case-list', type: 'link', name: 'Cases', icon: 'event_available' },
  { state: 'assetAlert', type: 'link', name: 'Assest Alert', icon: 'warning' },
  { state: 'alert-list', type: 'link', name: 'Alerts', icon: 'warning' },
  { state: 'createAsset', type: 'link', name: 'Create Assests', icon: 'assessment' },
  { state: 'asset-list', type: 'link', name: 'Assests', icon: 'assessment' },
  { state: 'create-site', type: 'link', name: 'Create Sites', icon: 'language' },
  { state: 'site-list', type: 'link', name: 'Sites', icon: 'language' },
  { state: 'roleList', type: 'link', name: 'Roles', icon: 'supervised_user_circle' },
  { state: 'siteDetail', type: 'link', name: 'Site-Detail', icon: 'language' }
  
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
