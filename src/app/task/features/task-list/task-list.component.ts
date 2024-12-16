import { Component, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router} from '@angular/router';
import { AuthStateService } from '../../../shared/data-access/auth-state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule,],
})
export default class TaskListComponent {
  profile = {
    firstName: '',
    lastName: '',
    career: '',
    cycle: '',
    birthdate: '',
    photoBase64: '', // Almacenaremos la foto en Base64 aquí
  };

  private firestore = inject(Firestore);
  private authStateService = inject(AuthStateService);
  private router = inject(Router);

  constructor() {}

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.profile.photoBase64 = await this.convertFileToBase64(file);
    }
  }

  async convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async onSubmit() {
    if (!this.profile.firstName || !this.profile.lastName || !this.profile.career || !this.profile.cycle || !this.profile.birthdate || !this.profile.photoBase64) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    try {
      const profileCollection = collection(this.firestore, 'perfil');
      await addDoc(profileCollection, {
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        career: this.profile.career,
        cycle: this.profile.cycle,
        birthdate: this.profile.birthdate,
        photoBase64: this.profile.photoBase64,
        createdAt: new Date(),
      });
  
      alert('Perfil creado exitosamente.'); 
      this.resetForm();
  
      // Navegar al componente Post
      this.router.navigate(['tasks/post']);
    } catch (error) {
      console.error('Error al crear el perfil:', error);
      alert('Error al crear el perfil.');
    }
  }
  

  resetForm(): void {
    this.profile.firstName = '';
    this.profile.lastName = '';
    this.profile.career = '';
    this.profile.cycle = '';
    this.profile.birthdate = '';
    this.profile.photoBase64 = '';
  }
  navigateToPost(): void {
    this.router.navigate(['tasks/post']).catch((error) => {
      console.error('Error en la navegación:', error);
    });
  }
  
  logOut() {
    this.authStateService
      .logOut()
      .then(() => {
        console.log('Sesión cerrada');
        window.location.reload(); // Recargar la página automáticamente
      })
      .catch((error) => {
        console.error('Error al cerrar sesión', error);
      });
  }
}
