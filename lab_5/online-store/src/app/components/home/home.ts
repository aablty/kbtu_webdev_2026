import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { CategoryTree, Product } from '@/app/models';
import { StoreHeader } from '../store-header/store-header';
import { StoreSearch } from '../store-search/store-search';
import { SortMenu } from '../sort-menu/sort-menu';
import { ProductList } from '../product-list/product-list';
import { FiltersComponent } from '../filters/filters';
import { Pagination } from '../pagination/pagination';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    StoreHeader,
    StoreSearch,
    SortMenu,
    ProductList,
    FiltersComponent,
    Pagination,
  ],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private http = inject(HttpClient);

  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  categories = signal<CategoryTree | null>(null);
  categoriesLoading = signal(false);
  categoriesError = signal<string | null>(null);
  searchQuery = signal('');
  activeQuery = signal('');
  activeCategory = signal('');
  sortOption = signal<'relevance' | 'created-desc' | 'price-asc' | 'price-desc' | 'rating'>(
    'relevance',
  );
  currentPage = signal(0);
  total = signal<number | null>(null);
  totalPages = signal<number | null>(null);

  ngOnInit() {
    this.loadData('');
  }

  onSearchSubmit(query: string) {
    const trimmedQuery = query.trim();
    this.searchQuery.set(query);
    this.activeQuery.set(trimmedQuery);
    this.currentPage.set(0);
    this.loadData(trimmedQuery);
  }

  onCategoryChange(categoryId: string) {
    this.activeCategory.set(categoryId);
    this.currentPage.set(0);
    this.loadData(this.activeQuery(), categoryId);
  }

  clearSearch() {
    this.searchQuery.set('');
    this.activeQuery.set('');
    this.currentPage.set(0);
    this.loadData('');
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadProducts(this.activeQuery(), this.activeCategory(), page, this.sortOption());
  }

  onSortChange(option: 'relevance' | 'created-desc' | 'price-asc' | 'price-desc' | 'rating') {
    this.sortOption.set(option);
    this.loadProducts(this.activeQuery(), this.activeCategory(), this.currentPage(), option);
  }

  getArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }

  loadData(
    query: string,
    category: string = '',
    page: number = 0,
    sort: 'relevance' | 'created-desc' | 'price-asc' | 'price-desc' | 'rating' = 'relevance',
  ) {
    this.loadProducts(query, category, page, sort);
    this.loadCategories(query, category);
  }

  loadProducts(
    query: string,
    category: string,
    page: number,
    sort: 'relevance' | 'created-desc' | 'price-asc' | 'price-desc' | 'rating',
  ) {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<any[]>(`http://localhost:3000/products`, {
        params: {
          text: query,
          page: page.toString(),
          q: category,
          sort: sort,
        },
      })
      .subscribe({
        next: (products: Product[]) => {
          this.products.set(products);
          this.loading.set(false);
        },
        error: (err: any) => {
          console.error('Error loading products:', err);
          this.error.set('Failed to load products');
          this.loading.set(false);
        },
      });
  }

  loadCategories(query: string, category: string) {
    this.categoriesLoading.set(true);
    this.categoriesError.set(null);

    this.http
      .get<CategoryTree>(`http://localhost:3000/categories`, {
        params: {
          text: query,
          q: category,
        },
      })
      .subscribe({
        next: (categories: CategoryTree) => {
          this.categories.set(categories);
          this.categoriesLoading.set(false);
          this.total.set(categories ? categories.top.count : null);
          this.totalPages.set(categories ? this.calcTotalPages(categories.top.count) : null);
        },
        error: (err: any) => {
          console.error('Error loading categories:', err);
          this.categoriesError.set('Failed to load categories');
          this.categoriesLoading.set(false);
        },
      });
  }

  calcTotalPages(total: number, pageSize: number = 12): number {
    return Math.min(Math.ceil(total / pageSize), 84);
  }
}
