import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-image-gallery',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './image-gallery.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGallery {
  images = input.required<string[]>();
  productName = input.required<string>();

  selectedIndex = 0;
  isLightboxOpen = false;

  goNext() {
    this.selectedIndex = (this.selectedIndex + 1) % this.images().length;
  }

  goPrev() {
    this.selectedIndex = (this.selectedIndex - 1 + this.images().length) % this.images().length;
  }

  selectImage(index: number) {
    this.selectedIndex = index;
  }
}
