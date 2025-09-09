import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
   import { Router } from '@angular/router';
   import { CommonModule } from '@angular/common';
   import { isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../services/sidebar.service';

   @Component({
     selector: 'app-header',
     templateUrl: './header.component.html',
     styleUrls: ['./header.component.css'],
     standalone: true,
     imports: [CommonModule, SidebarComponent]
   })
   export class HeaderComponent implements OnInit {
     profileImage: string | null = null;
     isSidebarOpen = false;

     constructor(
       private router: Router,
       @Inject(PLATFORM_ID) private platformId: Object,private sidebarService: SidebarService
     ) {}

     ngOnInit(): void {
       if (isPlatformBrowser(this.platformId)) {
         this.profileImage = localStorage.getItem('profileImage');
       }
        this.sidebarService.isOpen$.subscribe(state => {
        this.isSidebarOpen = state;
      });
     }

     goHome(): void {
       this.router.navigate(['/home']);
     }


     goToPerfil(): void {
       this.router.navigate(['/perfil']);
     }

     logout(): void {
       this.router.navigate(['/auth/login']);
     }

     viewNotifications(): void {
       this.router.navigate(['/notifications']);
     }
  
    toggleMenu(): void {
      this.sidebarService.toggle();
    }
   }