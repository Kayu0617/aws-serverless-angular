import { Component, input } from "@angular/core";
import { Product } from "../../../../types/types";

@Component({
  selector: "app-product-card",
  standalone: true,
  template: `
    <div class="productCard">
      <div class="productImage"></div>
      <div class="productDetail">
        <p class="name">{{ product().name }}</p>
        <p class="price">¥{{ product().price }}</p>
        <p class="stock">在庫：{{ product().stock }}</p>
        @if (product().stock === 0) {
          <button class="noStock" disabled>在庫なし</button>
        } @else {
          <button class="cartBtn">カートに入れる</button>
        }
      </div>
    </div>
  `,
  styleUrl: "./product-card.component.css",
})
export class ProductCardComponent {
  product = input.required<Product>();
}
