import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '../../shared/guard/applicationHttpClient.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseListService {

  constructor(private http: ApplicationHttpClient) { }

  getAllUsers() : Observable<any> {
    return this.http.Get('/user/getAllUsers');
  }
}
