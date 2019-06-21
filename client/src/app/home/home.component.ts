import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaObserver } from '@angular/flex-layout';
import { Product, ProductService } from '../shared/services/product.service';

@Component({
  selector: 'aaa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  columns$: Observable<number>;
  products$: Observable<Product[]>;

  readonly breakpointsToColumnsNumber = new Map([
    [ 'xs', 1 ],
    [ 'sm', 2 ],
    [ 'md', 3 ],
    [ 'lg', 4 ],
    [ 'xl', 5 ],
  ]);

  constructor(private media: MediaObserver,
              private productService: ProductService) { }

  ngOnInit() {
    this.products$ = this.productService.getAll();
    this.columns$ = this.media.media$
        .pipe(
         map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias))
                        );
  }

}
