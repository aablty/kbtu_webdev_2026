import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-star-rating',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './star-rating.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRating {
  rating = input.required<number>();

  fullStars = computed(() => Math.floor(this.rating()));
  hasHalf = computed(() => this.rating() - this.fullStars() >= 0.3);
  emptyStars = computed(() => 5 - this.fullStars() - (this.hasHalf() ? 1 : 0));

  getArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }
}
