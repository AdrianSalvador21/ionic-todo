import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TaskInterface} from '../models/task.interface';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  public uid = '';
  private todosCollection: AngularFirestoreCollection<any>;
  private todos: Observable<any[]>;

  constructor(public db: AngularFirestore, public storage: Storage) {}

  async getUserId() {
    await this.storage.get('uid').then((val) => {
      this.uid = val;
      return this.uid;
    });
  }

  getTodos() {
    this.todosCollection = this.db.collection<any>('projects', ref => ref.where('uid', '==', this.uid));
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(
        actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const projectId = a.payload.doc.id;

            console.log(projectId);
            console.log(data);

            console.log({projectId, ...data});
            return {projectId, ...data};

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
