import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  User as FirebaseUser,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private injector = inject(Injector);

  constructor(private auth: Auth, private firestore: Firestore) {}

  register(email: string, password: string, username: string) {
    return runInInjectionContext(this.injector, async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        const user = userCredential.user;
  
        console.log('✅ Firebase Auth created:', user.uid);
  
        // ✅ Set displayName in Firebase Auth
        await updateProfile(user, {
          displayName: username
        });
  
        // ✅ Firestore write
        const userRef = doc(this.firestore, 'users', user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          username: username,
          createdAt: new Date(),
        });
  
        console.log('✅ User data written to Firestore at:', userRef.path);
        return userCredential;
      } catch (error) {
        console.error('❌ Error during registration:', error);
        throw error;
      }
    });
  }
  
  

  login(email: string, password: string) {
    return runInInjectionContext(this.injector, () => {
      return signInWithEmailAndPassword(this.auth, email, password);
    });
  }

  async getCurrentUserData(user: FirebaseUser) {
    return runInInjectionContext(this.injector, async () => {
      try {
        const userDoc = doc(this.firestore, 'users', user.uid);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
          console.log('✅ User data fetched:', userSnap.data());
          return userSnap.data();
        } else {
          console.warn('⚠️ User document not found');
          return null;
        }
      } catch (error) {
        console.error('❌ Error fetching user data:', error);
        return null;
      }
    });
  }

  logout() {
    return runInInjectionContext(this.injector, () => {
      return signOut(this.auth);
    });
  }
}
