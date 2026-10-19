import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";
import { sellerGuard } from "./core/guards/seller.guard";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },

  {
    path: "login",
    loadComponent: () =>
      import("./features/auth/login/login.component").then(
        (m) => m.LoginComponent,
      ),
  },

  {
    path: "register",
    loadComponent: () =>
      import("./features/auth/register/register.component").then(
        (m) => m.RegisterComponent,
      ),
  },

  {
    path: "home",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./features/consumer/home/home.component").then(
        (m) => m.HomeComponent,
      ),
  },

  {
    path: "products",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./features/consumer/product-list/product-list.component").then(
        (m) => m.ProductListComponent,
      ),
  },
  {
    path: "products/:sellerId/:productId",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./features/consumer/product-detail/product-detail.component").then(
        (m) => m.ProductDetailComponent,
      ),
  },
  {
    path: "cart",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./features/consumer/cart/cart.component").then(
        (m) => m.CartComponent,
      ),
  },
  {
    path: "orders",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./features/consumer/orders/orders.component").then(
        (m) => m.OrdersComponent,
      ),
  },
  {
    path: "seller/products",
    canActivate: [authGuard, sellerGuard],
    loadComponent: () =>
      import("./features/seller/seller-products/seller-products.component").then(
        (m) => m.SellerProductsComponent,
      ),
  },
  {
    path: "seller/orders",
    canActivate: [authGuard, sellerGuard],
    loadComponent: () =>
      import("./features/seller/seller-orders/seller-orders.component").then(
        (m) => m.SellerOrdersComponent,
      ),
  },

  { path: "**", redirectTo: "/home" },
];
