import { Component, OnInit } from '@angular/core';
import {TaskInterface} from '../../../../models/task.interface';
import {ActivatedRoute} from '@angular/router';
import {LoadingController, NavController} from '@ionic/angular';
import {TodoService} from '../../../../services/todo.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
})
export class NewProjectPage implements OnInit {
  todo: any = {
    task: '',
    priority: 0,
    uid: '',
    description: '',
    id: ''
  };
  todoId = null;
  public headerTitle = 'Nuevo proyecto';

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
      this.headerTitle = 'Editar proyecto';
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
        this.nav.navigateRoot('/dashboard-menu-tabs/projects');
      });
    } else {
      // create new
      console.log(this.todo);
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateRoot('/dashboard-menu-tabs/projects');
      });
    }
  }

  async deleteTodo() {
    const loading = await this.loadingController.create({
      message: 'Eliminando...'
    });
    this.todoService.removeTodo(this.todoId).then(() => {
      loading.dismiss();
      this.nav.navigateForward('/dashboard-menu-tabs/projects');
    });
  }
}
