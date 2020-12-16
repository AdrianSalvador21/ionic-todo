import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoadingController, NavController} from '@ionic/angular';
import {ProjectsService} from '../../../../services/projects.service';
import {Storage} from '@ionic/storage';
import {TodoService} from '../../../../services/todo.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  todo: any = {
    description: '',
    projectId: '',
    priority: '1',
    progress: '1',
    taskNumber: 0
  };
  todoId = null;
  projectData = null;
  public headerTitle = 'Nueva tarea';

  constructor(private route: ActivatedRoute,
              private nav: NavController,
              private todoService: TodoService,
              private projectService: ProjectsService,
              public storage: Storage,
              private loadingController: LoadingController
  ) {

  }

  ngOnInit() {
    this.todoId = this.route.snapshot.params.id;
    if (this.todoId) {
      this.headerTitle = 'Editar tarea';
      this.loadTodo();
    } else {
      this.storage.get('projectId').then((val) => {
        this.todo.projectId = (val) ? val : '';
        console.log(this.todo);
        this.projectService.getTodo(this.todo.projectId).subscribe((projectData) => {
          console.log(projectData);
          this.projectData = projectData;
          this.todo.taskNumber = Number(this.projectData.taskCounter) + 1;
          this.projectData.taskCounter  = Number(this.projectData.taskCounter) + 1;
        });
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
        this.nav.navigateRoot('/dashboard-menu-tabs/project-detail');
      });
    } else {
      // create new
      console.log(this.todo);
      this.projectService.updateTodo(this.projectData, this.todo.projectId).then(() => {
        this.todoService.addTodo(this.todo).then(() => {
          loading.dismiss();
          this.nav.navigateRoot('/dashboard-menu-tabs/project-detail');
        });
      });
    }
  }

  async deleteTodo() {
    const loading = await this.loadingController.create({
      message: 'Eliminando...'
    });
    this.todoService.removeTodo(this.todoId).then(() => {
      loading.dismiss();
      this.nav.navigateForward('/dashboard-menu-tabs/project-detail');
    });
  }

}
