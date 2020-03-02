import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationHttpClient } from '../../shared/guard/applicationHttpClient.service';

@Injectable()
export class UserListService {

  requestApi: string = '/user';

  constructor(private http: ApplicationHttpClient) { }


  getAllUsers(): Observable<any> {
    return this.http.Get(this.requestApi +'/getAllUsers');
  }

  createUser(user: any): Observable<any> {
    return this.http.Post(this.requestApi +'/createUser', user);
    /*user.id = this.usersData.length + 1 + "";
    this.usersData.push(user);
    return Observable.of(user);*/
  }
  activateDeactivateUser(user: any): Observable<any> {
    return this.http.Get(this.requestApi + '/activateDeactivateUser' + user);
  }
}
