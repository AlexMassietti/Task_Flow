import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core'; // Added ChangeDetectorRef
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../services/sidebar.service';
import { DashboardEditModalComponent } from './EditModal/dashboard-edit-modal.component';
import { Router } from '@angular/router';
import { DashboardModel, DashboardDTO } from '../Models/Dashboard/dashboard.model';
import { HomeService } from '../services/home.service';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { finalize, pipe, Subject, takeUntil } from 'rxjs';
import { DashboardCreateModalComponent } from './CreateModal/dashboard-create-modal.component';
import { Inject, PLATFORM_ID } from '@angular/core'; 
import { isPlatformBrowser } from '@angular/common'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    DashboardEditModalComponent,
    DashboardCreateModalComponent,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sidebarService: SidebarService,
    private router: Router,
    private HomeService: HomeService,
    private cdr: ChangeDetectorRef // 1. Injected ChangeDetectorRef
  ) {}

  private destroy$ = new Subject<void>();
  isSidebarOpen = false;
  showEditModal = false;
  showCreateModal = false;
  dashboardToEdit: DashboardModel | null = null;
  loading = false;
  useMock = false;
  ownedDashboards: DashboardModel[] | null = [];
  sharedDashboards: DashboardModel[] | null = [];

  private loadDashboardData(): void {
    this.loading = true;
    // Ensure the loading state is visible
    this.cdr.markForCheck();

    combineLatest([
      this.HomeService.getOwnedDashboardsByUser(),
      this.HomeService.getSharedDashboardsByUser(),
    ])
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck(); // 2. Trigger update when loading finishes
        }),
      )
      .subscribe({
        next: ([ownedDashboards, sharedDashboards]) => {
          this.ownedDashboards = ownedDashboards;
          this.sharedDashboards = sharedDashboards;
          console.log('Data loaded successfully');
          this.cdr.markForCheck(); // 3. Trigger update when data arrives
        },
        error: (err) => {
          console.log('Error Source:', err.url);
          this.cdr.markForCheck(); // 4. Trigger update even on error to hide loading
        }
      });
  }

  ngOnInit() {
    this.sidebarService.isOpen$.subscribe((state) => {
      this.isSidebarOpen = state;
      this.cdr.markForCheck(); // 5. Ensure sidebar toggle updates UI
    });

    if (isPlatformBrowser(this.platformId)) {
      this.loadDashboardData();
    }
  }

  // ... rest of your methods (goToDashboard, openEditModal, etc.) remain the same
  // Note: Your newDashboard and updateDashboard methods call loadDashboardData(), 
  // so they will benefit from the fixes above automatically.

  goToDashboard(dashboardId: number) {
    this.router.navigateByUrl(`/dashboard/${dashboardId}`);
  }

  openEditModal(dashboard: DashboardModel) {
    this.dashboardToEdit = dashboard;
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.dashboardToEdit = null;
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  newDashboard(name: string, description: string) {
    this.HomeService.newDashboard(name, description)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadDashboardData();
        },
        error: (err) => {
          console.error('Failed to create new dashboard', err);
        },
      });
    this.closeCreateModal();
  }

  updateDashboard(updatedModel: DashboardModel) {
    this.showEditModal = false;
    if (!updatedModel) return;
    this.HomeService.updateDashboard(updatedModel)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadDashboardData();
        },
        error: (err) => {
          console.error('Failed to update dashboard', err);
        },
      });
  }
}