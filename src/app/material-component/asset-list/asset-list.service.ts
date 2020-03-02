import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '../../shared/guard/applicationHttpClient.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetListService {

  constructor(private http: ApplicationHttpClient) { }

  getAllAssets(): Observable<any>{
    return this.http.Get('/asset/getAllAssets');
  }

  getAllAssetClass(): Observable<any> {
    return this.http.Get('/assetClass/getAllAssetClass');
  }

  // deleteAssetById(assetsId: any): Observable<any>{
  //   return this.http.Delete('/asset/deleteAssetsById/' + assetsId);
  // }
}
