// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  // ✅ Register with email/password and save extra info in Firestore
  async register(email: string, password: string, username: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

    // Save additional user data to Firestore
    await setDoc(doc(this.firestore, 'users', userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      username: username,
      createdAt: new Date()
    });

    return userCredential;
  }

  // ✅ Login with email/password
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
