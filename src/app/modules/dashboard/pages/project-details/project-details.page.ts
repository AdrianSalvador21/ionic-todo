import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {LoadingController, ModalController, NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {TodoService} from '../../../../services/todo.service';
import {ProjectsService} from '../../../../services/projects.service';
import {TaskDetailPage} from '../task-detail/task-detail.page';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit {
  public todos = [];
  public todoArray: any[] = [];
  public wipArray: any[] = [];
  public completeArray: any[] = [];
  public projectData: any = {};
  showCategoryDetail = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'Fecha'},
    {name: 'Categoría'}
  ];

  constructor(private loadingController: LoadingController, public todoService: TodoService, private modalCtrl: ModalController, public projectService: ProjectsService,
              public storage: Storage) { }

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.todoService.getProjectId().then((projectId) => {
      console.log(this.todoService.projectId);
      this.projectService.getTodo(this.todoService.projectId).subscribe((data) => {
        console.log(data);
        this.projectData = data;
      });
      this.todoService.getTodos().subscribe(response => {
        this.todos = response;
        console.log(this.todos);
        this.todoArray = this.todos.filter(todo => todo.progress === '1');
        this.wipArray = this.todos.filter(todo => todo.progress === '2');
        this.completeArray = this.todos.filter(todo => todo.progress === '3');
        loading.dismiss();
      });
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  setProgressLabel(priority) {
    switch (priority) {
      case '1':
        return 'Por hacer';
      case '2':
        return 'En progreso';
      case '3':
        return 'Completada';
    }
  }

  setPriorityColor(priority) {
    return {
      green: priority === '1',
      orange: priority === '2',
      red: priority === '3'
    };
  }

  async todoDetail(todo) {
    console.log(todo);
    this.storage.set('taskId', todo.id).then(async () => {
      const modal = await this.modalCtrl.create({
        component: TaskDetailPage,
        componentProps: {
          data: todo
        }
      });

      await modal.present();
    });
  }

}
