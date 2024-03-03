import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private dbPath = '/tutorials';

  dataRef!: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    // this.dataRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<any> {
    return this.dataRef;
  }

  create(url: string, data: any): any {
    return this.db.list(url).push(data);
  }

  update(url:string, key: string, value: any): Promise<void> {
    return this.db.list(url).update(key, value);
  }
  set(url:string, key: string, value: any): Promise<void> {
    return this.db.list(url).update(key, value)
  }

  delete(url:string,key: string): Promise<void> {
    return this.db.list(url).remove(key);
  }

  deleteAll(): Promise<void> {
    return this.dataRef.remove();
  }
}
