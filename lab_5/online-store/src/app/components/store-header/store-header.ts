import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-store-header',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './store-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreHeader {
  searchQuery = input<string>('');
  searchChange = output<string>();

  onSearchChange(query: string) {
    this.searchChange.emit(query);
  }
}
