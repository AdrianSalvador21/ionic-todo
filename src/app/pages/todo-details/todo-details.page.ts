import { Component, OnInit } from '@angular/core';
import { TaskInterface} from '../../models/task.interface';
import {TodoService} from '../../services/todo.service';

import {ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  todo: TaskInterface = {
    task: '',
    priority: 0,
    uid: ''
  };
  todoId = null;

  constructor(private route: ActivatedRoute,
              private nav: NavController,
              private todoService: TodoService,
              public storage: Storage,
              private loadingController: LoadingController
  ) {

  }

  ngOnInit() {
    this.todoId = this.route.snapshot.params.id;
    if (this.todoId) {
      this.loadTodo();
    } else {
      this.storage.get('uid').then((val) => {
        this.todo.uid = (val) ? val : '';
      });
    }
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });

    await loading.present();
    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }

  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Guardando...'
    });

    await loading.present();
    if (this.todoId) {
      // update
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateRoot('/home');
      });
    } else {
      // create new
      console.log(this.todo);
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateRoot('/home');
      });
    }
  }

  async deleteTodo() {
    const loading = await this.loadingController.create({
      message: 'Eliminando...'
    });
    this.todoService.removeTodo(this.todoId).then(() => {
      loading.dismiss();
      this.nav.navigateForward('/');
    });
  }
}
