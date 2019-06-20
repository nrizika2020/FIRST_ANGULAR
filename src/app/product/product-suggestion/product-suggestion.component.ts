import { Component, OnInit, Input } from '@angular/core';
import { Product, ProductService } from 'src/app/shared/services/product.service';
import { Observable } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'aaa-product-suggestion',
  templateUrl: './product-suggestion.component.html',
  styleUrls: ['./product-suggestion.component.scss']
})
export class ProductSuggestionComponent implements OnInit {
  @Input() products: Product[];
  columns$: Observable<number>;

  readonly breakpointsToColumnsNumber = new Map([
    [ 'xs', 2 ],
    [ 'sm', 3 ],
    [ 'md', 5 ],
    [ 'lg', 2 ],
    [ 'xl', 3 ],
  ]);

  constructor(private media: MediaObserver) { }

  ngOnInit() {
    this.columns$ = this.media.media$
        .pipe(
         map(mc => <number>this.breakpointsToColumnsNumber.get(mc.mqAlias)),
         startWith(3)   // bug work around
      );
  }

}
