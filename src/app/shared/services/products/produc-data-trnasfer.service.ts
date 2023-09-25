import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { IGetAllProductsResponse } from 'src/app/models/interfaces/products/respponse/IGetAllProductsResponse';

@Injectable({
  providedIn: 'root',
})
export class ProducDataTrnasferService {
  constructor() {}

  public productsDataEmitter$ = new BehaviorSubject<
    IGetAllProductsResponse[] | null
  >(null);
  public productDatas: IGetAllProductsResponse[] = [];

  setProductsDatas(products: IGetAllProductsResponse[]): void {
    if (products) {
      this.productsDataEmitter$.next(products);
      this.getProductsDatas();
    }
  }
  getProductsDatas() {
    this.productsDataEmitter$
      .pipe(
        take(1),
        map((data) => data?.filter((product) => product.amount > 0))
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.productDatas = data;
          }
        },
      });
    return this.productDatas;
  }
}
