import { Component, computed, inject, signal, OnInit } from "@angular/core";
import { ProductCardComponent } from "../../../shared/components/product-card/product-card.component";
import { HttpClient } from "@angular/common/http";
import { GetProductsResponse, Product } from "../../../../types/types";

@Component({
  selector: "app-product-list",
  standalone: true,
  styleUrl: "./product-list.component.css",
  imports: [ProductCardComponent],
  template: ` <h1>商品一覧</h1>
    <div class="categoryFilter">
      <button
        class="categoryBtn"
        [class.active]="selectedCategory() === 'すべて'"
        (click)="changeCategory('すべて')"
      >
        すべて
      </button>
      <button
        class="categoryBtn"
        [class.active]="selectedCategory() === 'パン'"
        (click)="changeCategory('パン')"
      >
        パン
      </button>
      <button
        class="categoryBtn"
        [class.active]="selectedCategory() === 'ケーキ'"
        (click)="changeCategory('ケーキ')"
      >
        ケーキ
      </button>
      <button
        class="categoryBtn"
        [class.active]="selectedCategory() === '焼き菓子'"
        (click)="changeCategory('焼き菓子')"
      >
        焼き菓子
      </button>
    </div>
    <div class="productList">
      @for (item of items(); track item.productId) {
        <app-product-card [product]="item" />
      }
    </div>`,
})
export class ProductListComponent implements OnInit {
  items = signal<Product[]>([]);

  selectedCategory = signal("すべて");
  filterItems = computed(() => {
    return this.items().filter(
      (item) =>
        item.category === this.selectedCategory() ||
        this.selectedCategory() === "すべて",
    );
  });

  private http = inject(HttpClient);

  changeCategory(category: string) {
    this.selectedCategory.set(category);
    this.getProducts();
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    const params: Record<string, string> = {};

    if (this.selectedCategory() !== "すべて") {
      params["category"] = this.selectedCategory();
    }

    this.http
      .get<GetProductsResponse>(
        "https://exrgvcytof.execute-api.us-east-1.amazonaws.com/prod/products",
        { params },
      )
      .subscribe({
        next: (data) => {
          console.log("取得件数:", data.items.length);
          console.log("lastKey:", data.lastKey);
          this.items.set(data.items);
        },
        error: (error) => {
          console.error("商品取得エラー:", error);
        },
      });
  }
}
