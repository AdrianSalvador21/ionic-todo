import {Component, Input, OnInit} from '@angular/core';
import {LoadingController, ModalController} from '@ionic/angular';
import {TodoService} from '../../../../services/todo.service';
import {CommentsService} from '../../../../services/comments.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {
  @Input() data: any;
  public progressTypes = [
    {label: 'Por hacer', value: '1'},
    {label: 'En progreso', value: '2'},
    {label: 'Completada', value: '3'}
  ];
  public commentsData = [];

  constructor(public modal: ModalController, public todoService: TodoService, public commentService: CommentsService, private loadingController: LoadingController) { }

  ngOnInit() {
    // this.data.createdDate = this.data.createdDate.toDate();
    console.log(this.data.id);
  }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.commentService.getTaskId().then((taskId) => {
      this.commentService.getComments().subscribe(response => {
        console.log('comennts', response);
        this.commentsData = response;
        loading.dismiss();
      });
    });
  }

  setPriorityColor(priority) {
    return {
      green: priority === '1',
      orange: priority === '2',
      red: priority === '3'
    };
  }

  closeModal() {
    this.modal.dismiss();
  }

  updateTask() {
    setTimeout(() => {
      this.todoService.updateTodo(this.data, this.data.id).then((data2) => {
        console.log(data2);
      });
    }, 2000);
    console.log(this.data);
  }

  async addMessage(input) {
    const loading = await this.loadingController.create({
      message: 'Guardando...'
    });

    await loading.present();
    console.log(input.value);
    const newMessageData = {
      taskId: this.data.id,
      message: input.value,
      createdDate: new Date()
    };

    this.commentService.addComment(newMessageData).then((data) => {
      console.log(data);
      loading.dismiss();
    });
  }

}
