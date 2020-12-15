import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardMenuTabsPageRoutingModule } from './dashboard-menu-tabs-routing.module';

import { DashboardMenuTabsPage } from './dashboard-menu-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardMenuTabsPageRoutingModule
  ],
  declarations: [DashboardMenuTabsPage]
})
export class DashboardMenuTabsPageModule {}
