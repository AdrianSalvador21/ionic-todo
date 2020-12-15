import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewProjectPageRoutingModule } from './new-project-routing.module';

import { NewProjectPage } from './new-project.page';
import {MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewProjectPageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [NewProjectPage]
})
export class NewProjectPageModule {}
