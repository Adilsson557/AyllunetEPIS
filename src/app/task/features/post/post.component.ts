import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface User {
  displayName: string;
  photoURL: string;
}

interface Post {
  title: string;
  content: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export default class PostComponent implements OnInit {
  users: Observable<User[]>;
  posts: Observable<Post[]>;

  constructor(private firestore: Firestore) {
    // Colección de usuarios registrados
    const usersCollection = collection(this.firestore, 'perfil');
    this.users = collectionData(usersCollection, { idField: 'id' }) as Observable<User[]>;

    // Colección de publicaciones
    const postsCollection = collection(this.firestore, 'posts');
    this.posts = collectionData(postsCollection, { idField: 'id' }) as Observable<Post[]>;
  }

  ngOnInit(): void {}
}
