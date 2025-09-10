import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../Models/Task/task.model';
import { DashBoardService } from '../services/dashboard.service';
import { combineLatest, finalize, Subject, switchMap, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { StatusModel } from '../Models/Status/status.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './DashBoard.html',
  styleUrls: ['./DashBoard.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardId!: number;
  tasks: TaskModel[] = [];
  statuses: StatusModel[] = []
  tasksByStatus: { [status: number]: TaskModel[] } = {};
  private destroy$ = new Subject<void>();
  loading = false;

  constructor(private route: ActivatedRoute, private dashBoardService: DashBoardService) {}
  ngOnInit(): void {
  this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((pm: ParamMap) => {
    this.dashboardId = Number(pm.get('id'));
    this.loadDashboardData();
  });
}

  private loadTaskByStatus() {
    this.tasksByStatus = {}
    this.statuses.forEach(status => {
      this.tasksByStatus[status.id] = [];
      this.tasksByStatus[status.id] = this.filterTasksByStatus(status);
    });
    return this.tasksByStatus;
  }

  private filterTasksByStatus(status: StatusModel) {
    return this.tasks.filter(task => task.status?.id === status.id);
  }

 private loadDashboardData(): void {
  this.loading = true;
  combineLatest([
    this.dashBoardService.getStatuses(),
    this.dashBoardService.getTasks(this.dashboardId)
  ])
  .pipe(
    takeUntil(this.destroy$),
    finalize(() => (this.loading = false))
  )
  .subscribe({
    next: ([statuses, tasks]) => {
      this.statuses = statuses;
      this.tasks = tasks;
      this.tasksByStatus = this.loadTaskByStatus();
    },
    error: (err) => {
      console.error('Failed to load dashboard data', err);
      this.tasks = [];
      this.statuses = [];
      this.tasksByStatus = {};
    }
  });
}

  refreshData(): void {
  this.loadDashboardData();
}

trackByStatus(index: number, status: StatusModel): any {
  return status.id || status.name;
}

trackByTask(index: number, task: TaskModel): any {
  return task.id || task.name;
}

getTaskCountForStatus(statusId: number): number {
  return this.tasksByStatus[statusId] ? this.tasksByStatus[statusId].length : 0;
}

getPriorityClass(priorityId: number): string {
  const priorityClasses: { [key: number]: string } = {
    1: 'bg-low',
    2: 'bg-warning',
    3: 'bg-high',
    4: 'bg-danger'
  };

  return priorityClasses[priorityId] || 'bg-secondary';
}

getStatusClass(statusId: number): string {
  if (!statusId) return 'bg-secondary';
  
  const statusClasses: { [key: number]: string } = {
    1 : 'bg-todo',
    2 : 'bg-doing',
    3 : 'bg-in-review',
    4 : 'bg-done',
  };

  return statusClasses[statusId] || 'bg-secondary';
}

  saveTask(task: TaskModel) {
    console.log('save', task);
  }

  editTask(task: TaskModel) {
    console.log('edit', task);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
