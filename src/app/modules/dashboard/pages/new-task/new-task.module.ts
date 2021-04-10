import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTaskPageRoutingModule } from './new-task-routing.module';

import { NewTaskPage } from './new-task.page';
import {MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {PipesModule} from '../../../../core/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTaskPageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PipesModule
  ],
  declarations: [NewTaskPage]
})
export class NewTaskPageModule {}
