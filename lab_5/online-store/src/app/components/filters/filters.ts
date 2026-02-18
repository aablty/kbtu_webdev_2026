import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

import { CategoryNode, CategoryTree } from '@/app/models';

@Component({
  selector: 'app-filters',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './filters.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  categories = input<CategoryTree | null>(null);
  categoryChange = output<string>();

  setCategory(categoryId: string = '') {
    this.categoryChange.emit(categoryId);
  }

  private expandedIds = new Set<string>();

  hasChildren(node: CategoryNode): boolean {
    return !!node.items?.length;
  }

  isExpanded(node: CategoryNode): boolean {
    return this.expandedIds.has(node.id);
  }

  toggle(node: CategoryNode) {
    if (!this.hasChildren(node)) {
      return;
    }

    if (this.expandedIds.has(node.id)) {
      this.expandedIds.delete(node.id);
      return;
    }

    this.expandedIds.add(node.id);
  }
}
