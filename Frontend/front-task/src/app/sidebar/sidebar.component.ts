import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SidebarComponent {

  constructor(private sidebarService: SidebarService) {}

  @Input() isOpen: boolean = false;
  
  ngOnInit() {
  this.sidebarService.isOpen$.subscribe(state => this.isOpen = state);
}

close() {
  this.sidebarService.close();
}

}
