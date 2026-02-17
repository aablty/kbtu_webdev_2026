import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Product } from '@/app/models';
import { StoreHeader } from '../store-header/store-header';
import { ProductList } from '../product-list/product-list';

import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [CommonModule, LucideAngularModule, StoreHeader, ProductList],
  templateUrl: './home.html',
})
export class Home implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private searchSubject = new Subject<string>();
  private subscription?: Subscription;

  products: Product[] = [];
  loading = false;
  error: string | null = null;
  searchQuery = '';
  activeQuery = '';

  ngOnInit() {
    // initial load with default query
    this.loadProducts('кукла барби');

    // debounce
    this.subscription = this.searchSubject
      .pipe(
        debounceTime(2000), // 2 sec
        distinctUntilChanged(),
      )
      .subscribe((query) => {
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
          this.activeQuery = trimmedQuery;
          this.loadProducts(trimmedQuery);
        }
        else this.loadProducts('кукла барби');
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.searchSubject.next(query);
  }

  clearSearch() {
    this.searchQuery = '';
    this.activeQuery = '';
    this.searchSubject.next('');
  }

  getArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }

  loadProducts(query: string) {
    this.loading = true;
    this.error = null;

    this.http.get<any[]>(`http://localhost:3000/products?query=${query}`).subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.activeQuery = this.searchQuery;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error('Error loading products:', err);
        this.error = 'Failed to load products';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
