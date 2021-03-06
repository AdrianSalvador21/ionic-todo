import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TaskInterface} from '../models/task.interface';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public uid = '';
  public projectId = '';
  private todosCollection: AngularFirestoreCollection<any>;
  private todos: Observable<any[]>;

  constructor(public db: AngularFirestore, public storage: Storage) {}

  async getUserId() {
    await this.storage.get('uid').then((val) => {
      this.uid = val;
      return this.uid;
    });
  }


  async getProjectId() {
    await this.storage.get('projectId').then((val) => {
      this.projectId = val;
      console.log(this.projectId);
      return this.projectId;
    });
  }

  getTodos() {
    this.todosCollection = this.db.collection<any>('todos', ref => ref.where('projectId', '==', this.projectId));
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(
        actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        }
      ));
    return this.todos;
  }

  getTodo(id: string) {
    return this.todosCollection.doc<any>(id).valueChanges();
  }

  updateTodo(todo: any, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }

  addTodo(todo: any) {
    return this.todosCollection.add(todo);
  }

  removeTodo(id: string) {
    return this.todosCollection.doc(id).delete();
  }
}
