import { Component, OnInit } from '@angular/core';
import {TaskInterface} from '../../../../models/task.interface';
import {TodoService} from '../../../../services/todo.service';
import {SecurityService} from '../../../../services/security.service';
import {LoadingController, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {ProjectsService} from '../../../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})

export class ProjectsPage implements OnInit {
  public todos: any[] = [];
  constructor(
    public todoService: ProjectsService,
    public securityService: SecurityService,
    private nav: NavController,
    private loadingController: LoadingController,
    public storage: Storage,
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.todoService.getUserId().then(() => {
      this.todoService.getTodos().subscribe(response => {
        this.todos = response;
        loading.dismiss();
      });
    });
  }

  async logout() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.storage.remove('uid').then(() => {
      this.securityService.logout().then(() => {
        this.nav.navigateRoot('/login');
        loading.dismiss();
      });
    });
  }

  goToDetail(project) {
    console.log(project);
    this.storage.set('projectId', project.projectId).then(() => {
      this.nav.navigateForward('/dashboard-menu-tabs/project-detail');
    });
  }
}
