import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './navbar.component.html',
})
export class Navbar {
  links = [
    { href: '/home', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/albums', label: 'Albums' },
  ];

  isActive(link: any) {
    return location.pathname.startsWith(link.href);
  }
}
