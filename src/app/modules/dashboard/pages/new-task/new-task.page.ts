import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoadingController, NavController} from '@ionic/angular';
import {ProjectsService} from '../../../../services/projects.service';
import {Storage} from '@ionic/storage';
import {TodoService} from '../../../../services/todo.service';

import {Plugins, CameraResultType, CameraSource} from '@capacitor/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
const { Camera } = Plugins;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  todo: any = {
    title: '',
    description: '',
    projectId: '',
    createdDate: '',
    priority: '1',
    progress: '1',
    taskNumber: 0,
    imagesUrl: []
  };
  todoId = null;
  projectData = null;
  public headerTitle = 'Nueva tarea';
  public downloadURL;
  public images = [];
  public uploadImages = [];

  constructor(private route: ActivatedRoute,
              private nav: NavController,
              private todoService: TodoService,
              private projectService: ProjectsService,
              public storage: Storage,
              private loadingController: LoadingController,
              private firebaseStorage: AngularFireStorage
  ) {

  }

  ionViewWillEnter() {
    this.todo = {
      title: '',
      description: '',
      projectId: '',
      createdDate: '',
      priority: '1',
      progress: '1',
      taskNumber: 0,
      imagesUrl: []
    };
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

  ngOnInit() {
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
      this.todo.createdDate = new Date();
      this.projectService.updateTodo(this.projectData, this.todo.projectId).then(() => {
        this.todoService.addTodo(this.todo).then(() => {
          console.log(this.todo);
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

  async newTicket() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      saveToGallery: true
    });
    const basicImage = 'data:image/jpeg;base64,' + image.base64String;
    console.log(image);
    this.images.push(basicImage);
    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
    const fileData = this.blobToFile(blobData, 'name');
    // this.uploadImages.push(fileData);
    this.uploadFile(fileData);
  }

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

   async uploadFile(fileData) {
     /* const loading = await this.loadingController.create({
       message: 'Guardando...'
     }); */

     console.log(fileData);
     const file = fileData;
     const filePath = 'taskImage' + Math.trunc(Math.random() * 543);
     const fileRef = this.firebaseStorage.ref(filePath);
     const task = this.firebaseStorage.upload(filePath, file).then(() => {
       fileRef.getDownloadURL().subscribe((dt) => {
         console.log('dt', dt);
         this.todo.imagesUrl.push(dt);
       });
     });
  }
}
