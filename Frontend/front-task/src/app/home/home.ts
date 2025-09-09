import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'] 
})

export class HomeComponent {

  constructor(private sidebarService: SidebarService) {}

  isSidebarOpen = false;

  ngOnInit() {
    this.sidebarService.isOpen$.subscribe(state => this.isSidebarOpen = state);
  }


}