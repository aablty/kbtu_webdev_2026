import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlbumService, Photo } from '@/app/services/album.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-album-photos',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  standalone: true,
  templateUrl: './album-photos.component.html',
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] = [];
  isLoading = true;
  error = '';
  id: number;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private cdr: ChangeDetectorRef,
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit() {
    this.fetchPhotos(this.id);
  }

  fetchPhotos(id: number) {
    this.isLoading = true;
    this.albumService.getAlbumPhotos(id).subscribe({
      next: (photos) => {
        this.photos = photos;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load photos.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
