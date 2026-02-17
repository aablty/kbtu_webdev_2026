import {
  Component,
  input,
  ElementRef,
  HostListener,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-share-button',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './share-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareButton {
  productName = input.required<string>();
  productLink = input.required<string>();

  isOpen = false;

  whatsappUrl = computed(
    () =>
      `https://wa.me/?text=${encodeURIComponent(`Check out this product: ${this.productLink()}`)}`,
  );

  telegramUrl = computed(
    () =>
      `https://t.me/share/url?url=${encodeURIComponent(this.productLink())}&text=${encodeURIComponent(this.productName())}`,
  );

  constructor(private elementRef: ElementRef) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
