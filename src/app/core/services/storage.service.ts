import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  LOCALSTORAGE_USER_CREDENTIALS_KEY: string = 'UserCredentials';
  constructor() { }
  setStorage(key: string, data: any) {
    // localStorage.setItem(this.LOCALSTORAGE_USER_CREDENTIALS_KEY, JSON.stringify(data));
    localStorage.setItem(key, JSON.stringify(data));

  }

    getStorage(key: string) {
    let data = localStorage.getItem(key) || '';
    return data
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
  getloginDetails(){
    let userCredentials = localStorage.getItem(this.LOCALSTORAGE_USER_CREDENTIALS_KEY);
    return userCredentials
  }

}
