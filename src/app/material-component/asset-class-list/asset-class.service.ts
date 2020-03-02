import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '../../shared/guard/applicationHttpClient.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssetClassService {

  requestApi: string = '/assetClass';

  constructor(private http: ApplicationHttpClient) {}  

  getAllAssetClass(): Observable<any> {
    return this.http.Get(this.requestApi + '/getAllAssetClass');
  }

  deleteAssetClass(assetClassId: any): Observable<any> {
    return this.http.Delete(this.requestApi + '/deleteAssetClassById/' + assetClassId);
  }

  createAssetClass(assetClass: any): Observable<any> {
    return this.http.Post(this.requestApi + '/createAssetClass', assetClass);
  }

  
}
