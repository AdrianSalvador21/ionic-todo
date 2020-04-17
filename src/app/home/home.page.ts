import { Component, OnInit } from '@angular/core';
import {TaskInterface} from '../models/task.interface';
import {TodoService} from '../services/todo.service';
import {LoadingController, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {SecurityService} from '../services/security.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public todos: TaskInterface[] = [];
  constructor(
    public todoService: TodoService,
    public securityService: SecurityService,
    private nav: NavController,
    private loadingController: LoadingController,
    public storage: Storage,
  ) {}

  ngOnInit(): void {
    this.todoService.getUserId().then(() => {
      this.todoService.getTodos().subscribe(response => {
        this.todos = response;
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
}
