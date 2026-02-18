import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-store-search',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './store-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreSearch {
  searchQuery = input<string>('');
  searchSubmit = output<string>();
  draftQuery = '';

  constructor() {
    effect(() => {
      this.draftQuery = this.searchQuery();
    });
  }

  onSubmit() {
    this.searchSubmit.emit(this.draftQuery);
  }
}
