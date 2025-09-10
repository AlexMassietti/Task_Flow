import { Injectable } from '@angular/core';
import { PriorityModel } from '../Models/Priority/priority.model';
import { StatusModel } from '../Models/Status/status.model';
import { TaskDTO, TaskModel } from '../Models/Task/task.model';
import { delay, Observable, of } from 'rxjs';
import { S } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  private useMock = true;
  private apiBase = '/api';

  private mockPriorities: PriorityModel[] = [
    new PriorityModel(1, 'Low'),
    new PriorityModel(2, 'Medium'),
    new PriorityModel(3, 'High'),
    new PriorityModel(4, 'Urgent')
  ];

  private mockStatuses: StatusModel[] = [
    new StatusModel(1, 'To Do'),
    new StatusModel(2, 'Doing'),
    new StatusModel(3, 'In Review'),
    new StatusModel(4, 'Done')
  ];

  private mockTasks: TaskDTO[] = [
    {
      id: 1,
      dashboardId: 100,
      name: 'Design header',
      startDate: '2025-08-01T09:00:00Z',
      endDate: '2025-08-05T17:00:00Z',
      finishDate: null,
      status: { id: 1, name: 'To Do' },
      priority: { id: 2, name: 'Medium' },
      description: 'Create responsive header',
    },
    {
      id: 2,
      dashboardId: 100,
      name: 'Implement auth',
      startDate: '2025-08-02T10:00:00Z',
      endDate: '2025-08-07T18:00:00Z',
      finishDate: null,
      status: { id: 2, name: 'Doing' },
      priority: { id: 2, name: 'Medium' },
      description: 'Login, register endpoints + UI'
    },
    {
      id: 3,
      dashboardId: 100,
      name: 'Write unit tests for service with a very long name to check ellipsis',
      startDate: null,
      endDate: null,
      finishDate: null,
      status: { id: 3, name: 'In Review' },
      priority: { id: 4, name: 'Urgent' },
      description: 'Add coverage for critical paths'
    },
    {
      id: 17,
      dashboardId: 100,
      name: 'wow',
      startDate: null,
      endDate: null,
      finishDate: null,
      status: { id: 4, name: 'Done' },
      priority: { id: 3, name: 'High' },
      description: 'Add coverage for critical paths'
    },
    {
      id: 4,
      dashboardId: 100,
      name: 'Onboard customer',
      startDate: '2025-07-20T09:00:00Z',
      endDate: '2025-07-25T17:00:00Z',
      finishDate: '2025-07-24T15:00:00Z',
      status: { id: 1, name: 'Done' },
      priority: { id: 2, name: 'Medium' },
      description: 'Onboarding tasks done'
    },
    {
      id: 5,
      dashboardId: 100,
      name: 'wow',
      startDate: '2025-07-20T09:00:00Z',
      endDate: '2025-07-25T17:00:00Z',
      finishDate: '2025-07-24T15:00:00Z',
      status: { id: 2, name: 'Done' },
      priority: { id: 3, name: 'High' },
      description: 'wow'
    }
  ];

  getTasks(dashboardId: number): Observable<TaskModel[]> {
      const dtos = this.mockTasks.filter(t => Number(t.dashboardId) === Number(dashboardId));
      const models = dtos.map(dto => TaskModel.fromDTO(dto));
      return of(models);
  }

  getStatuses(): Observable<StatusModel[]> {
    const models = this.mockStatuses.map(dto => StatusModel.fromDTO(dto));
    return of(models);
  }

}
