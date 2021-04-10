import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskDetailPageRoutingModule } from './task-detail-routing.module';

import { TaskDetailPage } from './task-detail.page';
import {MatIconModule} from '@angular/material';
import {PipesModule} from '../../../../core/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskDetailPageRoutingModule,
    MatIconModule,
    PipesModule
  ],
  declarations: [TaskDetailPage],
  exports: [TaskDetailPage],
})
export class TaskDetailPageModule {}
