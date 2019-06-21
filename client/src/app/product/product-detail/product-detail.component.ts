import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChange, Inject } from '@angular/core';
import { Product } from 'src/app/shared/services/product.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { BidService, BidMessage } from 'src/app/shared/services/bid.service';
import { API_BASE_URL } from 'src/app/app.tokens';

@Component({
  selector: 'aaa-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  private readonly productChange$ = new Subject<Product>();
  latestBids$: Observable<number>;
  @Input() product: Product;
  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly bidService: BidService
  ) {}

  ngOnInit() {
    this.latestBids$ = combineLatest(
      this.productChange$.pipe(startWith(this.product)),
      this.bidService.priceUpdates$.pipe(startWith<BidMessage|null>(null)),
      (product, bid) =>  bid && bid.productId === product.id ? bid.price : product.price
    );
  }

  ngOnChanges({ product }: { product: SimpleChange }) {
    this.productChange$.next(product.currentValue);
  }

  placeBid(price: number) {
    this.bidService.placeBid(this.product.id, price);
  }

  urlFor(product: Product): string {
    return `${this.baseUrl}/${product.imageURL}`;
  }

}
