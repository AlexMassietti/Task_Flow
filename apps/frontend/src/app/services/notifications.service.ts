import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

export interface AppNotification {
  id: number;
  title: string;
  message: string;
  createdAt: Date; // Ajustado a lo que suele devolver TypeORM
  isRead: boolean;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly baseUrl = 'http://localhost:3002';
  
  // Iniciamos con un array vacío
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  constructor(private http: HttpClient) {
    // Cargamos las notificaciones al iniciar el servicio
    this.loadNotifications();
  }

  // GET: Obtener notificaciones del backend
  loadNotifications(): void {
    this.http.get<AppNotification[]>(`${this.baseUrl}/notification/my-notifications`)
      .subscribe({
        next: (notifs) => this.notificationsSubject.next(notifs),
        error: (err) => console.error('Error cargando notificaciones', err)
      });
  }

  get unreadCount$(): Observable<number> {
    return this.notifications$.pipe(
      map(notifs => notifs.filter(n => !n.isRead).length)
    );
  }

  // PATCH: Marcar como leída en el servidor y actualizar estado local
  markAsRead(id: number) {
    return this.http.patch(`${this.baseUrl}/notification/${id}/read`, {}).pipe(
      tap(() => {
        // Actualizamos el estado local para que el badge y la lista cambien al instante
        const currentNotifs = this.notificationsSubject.getValue();
        const updated = currentNotifs.map(n => 
          n.id === id ? { ...n, isRead: true } : n
        );
        this.notificationsSubject.next(updated);
      })
    ).subscribe({
      error: (err) => console.error('Error al marcar notificación:', err)
    });
  }

  markAllAsRead() {
  // We update locally BEFORE the HTTP call completes to ensure instant UI
  const currentNotifs = this.notificationsSubject.getValue();
  const updated = currentNotifs.map(n => ({ ...n, isRead: true }));
  this.notificationsSubject.next(updated);

  return this.http.patch(`${this.baseUrl}/notification/read-all`, {}).subscribe({
    next: () => console.log('Backend sync successful'),
    error: (err) => {
      console.error('Backend failed, reverting UI', err);
      this.loadNotifications(); // Revert if the server actually failed
    }
  });
}
}