import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

import { Product } from '@/app/models';
import { StarRating } from '../star-rating/star-rating';
import { ShareButton } from '../share-button/share-button';
import { ImageGallery } from '../image-gallery/image-gallery';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, LucideAngularModule, StarRating, ShareButton, ImageGallery],
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  product = input.required<Product>();

  formattedPrice = computed(() => this.product().price.toLocaleString('ru-KZ') + ' KZT');
}
