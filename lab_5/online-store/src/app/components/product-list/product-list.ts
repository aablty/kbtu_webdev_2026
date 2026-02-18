import {
  Component,
  input,
  signal,
  effect,
  untracked,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

import { Product } from '@/app/models';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, LucideAngularModule, ProductCard],
  templateUrl: './product-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  products = input<Product[]>([]);
  isLoading = input<boolean>(false);
  searchQuery = input<string>('');

  visibleProducts = signal<Product[]>([]);
  likesById = signal<Record<number, number>>({});

  constructor() {
    effect(() => {
      const incomingProducts = this.products();
      this.visibleProducts.set(incomingProducts);

      const currentLikes = untracked(() => this.likesById());
      const nextLikes: Record<number, number> = {};

      for (const product of incomingProducts) {
        nextLikes[product.id] = currentLikes[product.id] ?? product.likes ?? 0;
      }

      this.likesById.set(nextLikes);
    });
  }

  getLikes(productId: number): number {
    return this.likesById()[productId] ?? 0;
  }

  onLikeProduct(productId: number) {
    const currentLikes = this.likesById();
    this.likesById.set({
      ...currentLikes,
      [productId]: (currentLikes[productId] ?? 0) + 1,
    });
  }

  onDeleteProduct(productId: number) {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (!confirmed) {
      return;
    }

    this.visibleProducts.set(this.visibleProducts().filter((product) => product.id !== productId));

    const currentLikes = { ...this.likesById() };
    delete currentLikes[productId];
    this.likesById.set(currentLikes);
  }
}
