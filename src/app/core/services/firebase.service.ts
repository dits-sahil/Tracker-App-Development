import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, tap } from 'rxjs';
import { getMessaging, getToken } from "firebase/messaging";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  dataRef!: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    // this.dataRef = db.list(this.dbPath);
  }

  getAll(url: any): any {
    return this.db.list(url).snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({
          key: c.payload.key,
          value: c.payload.val()
        }))
      )

    );
  }

  create(url: string, data: any): any {
    return this.db.list(url).push(data);
  }

  update(url: string, key: string, value: any): Promise<void> {
    return this.db.list(url).update(key, value);
  }
  set(url: string, key: string, value: any): Promise<void> {
    return this.db.list(url).set(key, value)
  }

  delete(url: string, key: string): Promise<void> {
    return this.db.list(url).remove(key);
  }

  deleteAll(): Promise<void> {
    return this.dataRef.remove();
  }

  convertToObject(data: any) {
    const result: any = {};
    data.forEach((item: any) => {
      result[item.key] = item.value;
    });
    return result;
  }


}
