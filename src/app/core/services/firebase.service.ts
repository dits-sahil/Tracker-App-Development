import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyA-8tXzCsjOd59M2rMj69kH-ktdoK5OcD8",
  authDomain: "tracker-app-5a80b.firebaseapp.com",
  projectId: "tracker-app-5a80b",
  storageBucket: "tracker-app-5a80b.appspot.com",
  messagingSenderId: "722773943990",
  appId: "1:722773943990:web:bdd36b513cb8d3d9452817",
  measurementId: "G-SKLC53498S"
};

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  app = initializeApp(firebaseConfig);
  auth = getAuth();
  db = getFirestore(this.app);
  functions = getFunctions(this.app, 'europe-west1');

  constructor() {
    // The onAuthStateChanged will be triggered when the user login, logout
    // and when the user register also.
    // That's how the user is saved/removed in localStorage
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  createUser(user: any): Promise<void> {
    return createUserWithEmailAndPassword(
      this.auth,
      user.email,
      user.password
    ).then((userCredential: UserCredential) => {
      const userData = { ...user, uid: userCredential.user?.uid };
      return setDoc(doc(this.db, `users`, userData.uid), userData);
    });
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
    });
  }
}
