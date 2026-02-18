import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './pagination.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination {
  currentPage = input<number>(0);
  totalPages = input<number | null>(null);
  pageChange = output<number>();
  private readonly visiblePages = 5;

  onPrevious() {
    if (this.currentPage() > 0) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  onNext() {
    const total = this.totalPages();
    if (total && this.currentPage() < total - 1) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  onPageClick(page: number) {
    this.pageChange.emit(page);
  }

  canGoPrevious(): boolean {
    return this.currentPage() > 0;
  }

  canGoNext(): boolean {
    const total = this.totalPages();
    return total ? this.currentPage() < total - 1 : false;
  }

  getVisiblePages(): number[] {
    const total = this.totalPages() || 0;
    if (total <= this.visiblePages) {
      return Array.from({ length: total }, (_, i) => i);
    }

    const current = this.currentPage();
    let start = Math.max(0, current - Math.floor(this.visiblePages / 2));
    const end = Math.min(total, start + this.visiblePages);
    start = Math.max(0, end - this.visiblePages);

    return Array.from({ length: end - start }, (_, i) => start + i);
  }
}
