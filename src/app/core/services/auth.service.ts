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
import { Database } from '@firebase/database';
import { environment } from 'src/environments/environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { FirebaseService } from './firebase.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';

const firebaseConfig = environment.firebase;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  app = initializeApp(firebaseConfig);
  auth = getAuth();
  db = getFirestore();
  functions = getFunctions(this.app, 'europe-west1');
  private messageSubject = new Subject<any>();


  constructor(private readonly dbService: FirebaseService, private readonly toastrService: ToastrService) {
    onAuthStateChanged(this.auth, async (user: any) => {
      if (user) {
        let deviceToken: any;
        try {
          const token = await this.requestPermission();
          if (token) {
            deviceToken = token;
            this.updateDeviceToken(user.uid, deviceToken)
            this.listen();
          }
        } catch (err) {

        }

      }

    });
  }

  createUser(user: any): Promise<any> {
    return createUserWithEmailAndPassword(
      this.auth,
      user.email,
      user.password
    )
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
    });
  }

  async requestPermission() {
    const messaging = getMessaging();
    try {
      const currentToken = await getToken(messaging, { vapidKey: environment.firebase.vapidKey });
      if (currentToken) {
        return currentToken;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  async updateDeviceToken(userId: string, deviceToken: string) {
    this.dbService.update(`users`, userId, { deviceToken }).then((res: any) => {
    })
      .catch((error) => {
        this.toastrService.error(error.message)
      })
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      this.messageSubject.next(payload);
    });
  }

  getMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
