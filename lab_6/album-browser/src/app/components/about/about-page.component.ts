import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-page',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './about-page.component.html',
})
export class AboutPageComponent {}
