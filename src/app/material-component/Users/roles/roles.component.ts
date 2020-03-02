import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  titlePage = 'User Roles';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  addRole(){
    this.router.navigateByUrl('/user-role')
  }

}
