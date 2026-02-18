import {
  Component,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

type SortValue = 'relevance' | 'created-desc' | 'price-asc' | 'price-desc' | 'rating';

@Component({
  selector: 'app-sort-menu',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sort-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortMenu {
  isOpen = false;
  sortOption = input<SortValue>('relevance');
  sortChange = output<SortValue>();

  options: Array<{ value: SortValue; label: string }> = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'created-desc', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
  ];

  constructor(private elementRef: ElementRef) {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  selectOption(value: SortValue) {
    this.sortChange.emit(value);
    this.isOpen = false;
  }

  getSelectedLabel(): string {
    const match = this.options.find((option) => option.value === this.sortOption());
    return match ? match.label : 'Sort';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as Node | null;
    if (target && !this.elementRef.nativeElement.contains(target)) {
      this.isOpen = false;
    }
  }
}
