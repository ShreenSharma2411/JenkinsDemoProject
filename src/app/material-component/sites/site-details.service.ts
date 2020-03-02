import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationHttpClient } from '../../shared/guard/applicationHttpClient.service';


@Injectable()
export class SiteDetailsService {

  constructor(private http: ApplicationHttpClient) { }


  getAllSites(): Observable<any> {
    return this.http.Get('/site/getAllSites');
  }

  deleteSites(siteid: any): Observable<any> {
    return this.http.Delete('/site/deleteSiteBySiteId/' + siteid);
  }

  getAllAssetClass(): Observable<any> {
    return this.http.Get('/assetClass/getAllAssetClass');
  }

}
