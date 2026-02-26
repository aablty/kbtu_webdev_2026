import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  standalone: true,
  templateUrl: './home-page.component.html',
})
export class HomePage {}
