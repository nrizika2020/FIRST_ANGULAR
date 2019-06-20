import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/services/product.service';

@Component({
  selector: 'aaa-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  constructor() { }

  ngOnInit() {
  }

}
