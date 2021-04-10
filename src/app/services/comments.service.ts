import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  public uid = '';
  public projectId = '';
  public taskId = '';
  private commentsCollection: AngularFirestoreCollection<any>;
  private comments: Observable<any[]>;

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

  async getTaskId() {
    await this.storage.get('taskId').then((val) => {
      this.taskId = val;
      console.log(this.taskId);
      return this.taskId;
    });
  }

  getComments() {
    this.commentsCollection = this.db.collection<any>('comments', ref => ref.where('taskId', '==', this.taskId));
    this.comments = this.commentsCollection.snapshotChanges().pipe(
      map(
        actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        }
      ));
    return this.comments;
  }

  getComment(id: string) {
    return this.commentsCollection.doc<any>(id).valueChanges();
  }

  updateComment(todo: any, id: string) {
    return this.commentsCollection.doc(id).update(todo);
  }

  addComment(todo: any) {
    return this.commentsCollection.add(todo);
  }

  removeComment(id: string) {
    return this.commentsCollection.doc(id).delete();
  }
}
