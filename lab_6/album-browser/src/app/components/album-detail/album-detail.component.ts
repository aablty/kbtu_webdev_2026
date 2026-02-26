import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlbumService, Album } from '@/app/services/album.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-album-detail',
  imports: [CommonModule, RouterLink, FormsModule, LucideAngularModule],
  standalone: true,
  templateUrl: './album-detail.component.html',
})
export class AlbumDetailComponent implements OnInit {
  album: Album | null = null;
  isLoading = true;
  error = '';
  title = '';
  isSaving = false;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private cdr: ChangeDetectorRef,
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.fetchAlbum(this.id);
  }

  fetchAlbum(id: number) {
    this.isLoading = true;
    this.albumService.getAlbum(id).subscribe({
      next: (album) => {
        this.album = album;
        this.title = album.title;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load album.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  handleSave() {
    if (!this.album) return;
    this.isSaving = true;
    this.albumService.updateAlbum({ ...this.album, title: this.title }).subscribe({
      next: (updated) => {
        this.album = updated;
        this.isSaving = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isSaving = false;
        this.cdr.detectChanges();
      },
    });
  }
}
