import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-invite-people',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './invite-people.component.html',
  styleUrls: ['./invite-people.component.css']
})
export class InviteModalComponent {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() inviteUser = new EventEmitter<string>();

  email: string = '';
  isLoading: boolean = false;

  onClose() {
    this.email = ''; // Limpiar input al cerrar
    this.close.emit();
  }

  onSubmit() {
    if (this.email && this.isValidEmail(this.email)) {
      this.isLoading = true;
      
      // Emitimos el evento para que el componente padre maneje la lógica de API
      this.inviteUser.emit(this.email);
      
      // Simulación de reseteo (o puedes esperar a que el padre te avise)
      setTimeout(() => {
        this.isLoading = false;
        this.email = '';
        this.onClose();
      }, 500);
    }
  }

  private isValidEmail(email: string): boolean {
    // Validación simple de regex para email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}