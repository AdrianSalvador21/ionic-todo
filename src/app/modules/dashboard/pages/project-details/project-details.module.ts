import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectDetailsPageRoutingModule } from './project-details-routing.module';

import { ProjectDetailsPage } from './project-details.page';
import {MatChipsModule, MatIconModule, MatTabsModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectDetailsPageRoutingModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule
  ],
  declarations: [ProjectDetailsPage]
})
export class ProjectDetailsPageModule {}
