import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'aaa-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product$: Observable<Product>;
  suggestedProducts$: Observable<Product[]>;
  currentProductId: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    // console.log(this.route.params);
    this.product$ = this.route.paramMap
      .pipe(
        map(params => {
          return parseInt(params.get('productId') || '', 10)
        }),
        filter(productId => {
          return !!productId;
        }),
        switchMap(productId => {
          this.currentProductId = productId;
          return this.productService.getById(productId);
        })
      );
    // console.log(this.product$);
    this.suggestedProducts$ = this.productService.getAll()
      .pipe(
        map(
          products => products.filter(p => p.id !== this.currentProductId)
        )
      );
  }

}
