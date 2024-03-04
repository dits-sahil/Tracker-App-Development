import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  setStorage(key: string, data: any) {
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
}
