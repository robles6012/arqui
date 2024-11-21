import {Component} from '@angular/core';
import {NgOptimizedImage, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {ProductsService} from "@app/modules/products/services/products.service";
import {LoadingService} from "@app/core/services/loading.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-landing-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TitleCasePipe,
    UpperCasePipe
  ],
  templateUrl: './landing-home.component.html',
  styleUrl: './landing-home.component.scss'
})
export class LandingHomeComponent {

  products: any[] = [];

  constructor(
    private _product: ProductsService,
    private _loader: LoadingService,
    private _router: Router,

  ) {
    this.getProduct();
  }

  getProduct() {
    this._loader.show();
    this._product.getAllProducts().subscribe({
      next: (data : any) => {
        this.products = data;
        this._loader.hide();

        data.forEach(
          (item: any) => {
            if (item.images[0].startsWith('["')) {
              item.images = JSON.parse(item.images);
            }
          }
        )
      }
    })
  }

  goTo(){
    this._router.navigateByUrl('/').then();
  }
}
