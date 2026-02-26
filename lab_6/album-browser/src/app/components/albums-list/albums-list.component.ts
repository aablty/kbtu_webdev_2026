import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlbumService, Album } from '@/app/services/album.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-albums-list',
  imports: [CommonModule, RouterLink, FormsModule, LucideAngularModule],
  standalone: true,
  templateUrl: './albums-list.component.html',
})
export class AlbumsListComponent implements OnInit {
  albums: Album[] = [];
  filteredAlbums: Album[] = [];
  search = '';
  isLoading = true;
  error = '';
  deletingId: number | null = null;

  constructor(
    private albumService: AlbumService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.fetchAlbums();
  }

  fetchAlbums() {
    this.isLoading = true;
    this.albumService.getAlbums().subscribe({
      next: (albums) => {
        this.albums = albums;
        this.filterAlbums();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load albums.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  filterAlbums() {
    this.filteredAlbums = this.albums.filter((album) =>
      album.title.toLowerCase().includes(this.search.toLowerCase()),
    );
  }

  onSearchChange(value: string) {
    this.search = value;
    this.filterAlbums();
  }

  handleDelete(e: Event, id: number) {
    e.preventDefault();
    e.stopPropagation();
    this.deletingId = id;
    this.albumService.deleteAlbum(id).subscribe({
      next: () => {
        this.albums = this.albums.filter((a) => a.id !== id);
        this.filterAlbums();
        this.deletingId = null;
        this.cdr.detectChanges();
      },
      error: () => {
        this.deletingId = null;
        this.cdr.detectChanges();
      },
    });
  }
}
