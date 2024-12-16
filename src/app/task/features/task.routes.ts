import { Routes } from '@angular/router';

export default [
  {
    path: '', // Ruta principal de tareas
    loadComponent: () => import('./task-list/task-list.component'),
  },
  {
    path: 'post', // Ruta para el componente Post
    loadComponent: () => import('./post/post.component'),
  },
] as Routes;
