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
  private todosCollection: AngularFirestoreCollection<TaskInterface>;
  private todos: Observable<TaskInterface[]>;

  constructor(public db: AngularFirestore, public storage: Storage) {}

  async getUserId() {
    await this.storage.get('uid').then((val) => {
      this.uid = val;
      console.log(val);
      return this.uid;
    });
  }

  getTodos() {
    console.log(this.uid);
    this.todosCollection = this.db.collection<TaskInterface>('todos', ref => ref.where('uid', '==', this.uid));
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
    return this.todosCollection.doc<TaskInterface>(id).valueChanges();
  }

  updateTodo(todo: TaskInterface, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }

  addTodo(todo: TaskInterface) {
    return this.todosCollection.add(todo);
  }

  removeTodo(id: string) {
    return this.todosCollection.doc(id).delete();
  }
}
