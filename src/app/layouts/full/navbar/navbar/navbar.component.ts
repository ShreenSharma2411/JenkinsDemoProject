import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { Observable, of } from 'rxjs';
import { SiteDetailsService } from '../../../../material-component/sites/site-details.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  previousSites: any [] = [];
  items: MenuItem[] = [];
  siteList: any[] = [];


  constructor(private siteService: SiteDetailsService ){}

  ngOnInit() {
      this.items = [
        {
            label: 'Resources',
            items: [
                {label: 'Sites',routerLink: ['/site-list']},
                {label: 'Assets',routerLink: ['/asset-list']},
                {label: 'Asset Class',routerLink: ['/asset-class-list']}
            ]
       },
          {
              label: 'Insights',
              items: [
                  {label: 'Alerts',routerLink: ['/alert-list']},
                  {label: 'Cases',routerLink: ['/case-list']},
               
              ]
          },
          {
              label: 'User Management',
              items: [
                  {label: 'User',routerLink: ['/user-table']},
                  {label: 'Roles',routerLink: ['/roleList'] }
              ]
         },
    
      ];

      this.siteService.getAllSites().subscribe(prevSites => {
        this.siteList = prevSites;
        this.previousSites = prevSites     
      })
     
  }

  
}












  // alerts() {
  //   this.router.navigateByUrl('/alerts')
  // }

  // cases() {
  //   this.router.navigateByUrl('/cases')
  // }


  // sites() {
  //   this.router.navigateByUrl('/sites')
  // }

  // contact() {
  //   this.router.navigateByUrl('/contact')
  // }

  // users() {
  //   this.router.navigateByUrl('/users')
  // }

  // roleList() {
  //   this.router.navigateByUrl('/roleList')
  // }



