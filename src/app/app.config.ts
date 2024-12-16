import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(), 
    provideFirebaseApp(() => 
      initializeApp({
        apiKey: "AIzaSyDukT__tnRtmUQXlf5EGiqszRvI6Qlzw1w",
        authDomain: "ayllunet-8d369.firebaseapp.com",
        projectId: "ayllunet-8d369",
        storageBucket: "ayllunet-8d369.firebasestorage.app",
        messagingSenderId: "944793891181",
        appId: "1:944793891181:web:fa2b2b3b1b4128515e2a64"
      })
    ),
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())]
};
