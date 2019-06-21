import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService } from 'src/app/shared/services/product.service';
import { MediaObserver } from '@angular/flex-layout';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'aaa-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {

  @Input() products: Product[];
  columns$: Observable<number>;

  readonly breakpointsToColumnsNumber = new Map([
    ['xs', 1],
    ['sm', 2],
    ['md', 3],
    ['lg', 4],
    ['xl', 5],
  ]);

  constructor(private media: MediaObserver) { }

  ngOnInit() {
    this.columns$ = this.media.media$
      .pipe(
        map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias)),
        startWith(3)
      );
  }
}
