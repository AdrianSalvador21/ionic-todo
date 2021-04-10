import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectDetailsPageRoutingModule } from './project-details-routing.module';

import { ProjectDetailsPage } from './project-details.page';
import {MatChipsModule, MatIconModule, MatTabsModule} from '@angular/material';
import {TaskDetailPage} from '../task-detail/task-detail.page';
import {TaskDetailPageModule} from '../task-detail/task-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectDetailsPageRoutingModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    TaskDetailPageModule
  ],
  declarations: [ProjectDetailsPage],
  entryComponents: [
    TaskDetailPage
  ]
})
export class ProjectDetailsPageModule {}
