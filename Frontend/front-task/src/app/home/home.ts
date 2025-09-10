import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../services/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'] 
})

export class HomeComponent {

  constructor(private sidebarService: SidebarService, private router: Router) {}

  isSidebarOpen = false;

  ngOnInit() {
    this.sidebarService.isOpen$.subscribe(state => this.isSidebarOpen = state);
  }

  goToDashboards() {
      this.router.navigate(['/dashboards']);
  }
}