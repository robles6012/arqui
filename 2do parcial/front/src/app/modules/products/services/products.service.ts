import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private _http: HttpClient,
  ) {
  }

  public getAllProducts(): Observable<any> {
    return this._http.get<any>('http://localhost:3300/producto/All');
  }

  public getProductById(productId: string): Observable<any> {
    return this._http.get<any>('http://localhost:3300/producto/' + productId)
  }

  public updateProduct(productId: any, dataProduct: any): Observable<any> {
    return this._http.put(`http://localhost:3300/producto/` + productId, dataProduct);
  }

  public saveProduct(data: any): Observable<any> {
    console.log("aaaa " + data.toString());
    return this._http.post<any>('http://localhost:3300/producto' , data)
  }

  public deleteProduct(productId: string): Observable<any> {
    return this._http.delete<any>(`http://localhost:3300/producto/${productId}`);
  }



}
