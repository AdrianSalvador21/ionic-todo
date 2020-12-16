import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardMenuTabsPage } from './dashboard-menu-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardMenuTabsPage,
    children: [
      { path: 'home', loadChildren: () => import('../../../../home/home.module').then( m => m.HomePageModule)},
      {
        path: 'details/:id',
        loadChildren: () => import('../../../../pages/todo-details/todo-details.module').then( m => m.TodoDetailsPageModule)
      },
      {
        path: 'details',
        loadChildren: () => import('../../../../pages/todo-details/todo-details.module').then( m => m.TodoDetailsPageModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('../../../../modules/dashboard/pages/projects/projects.module').then( m => m.ProjectsPageModule)
      },
      {
        path: 'project-detail',
        loadChildren: () => import('../../../../modules/dashboard/pages/project-details/project-details.module').then( m => m.ProjectDetailsPageModule)
      },
      {
        path: 'new-project',
        loadChildren: () => import('../../../../modules/dashboard/pages/new-project/new-project.module').then( m => m.NewProjectPageModule)
      },
      {
        path: 'new-task',
        loadChildren: () => import('../../../../modules/dashboard/pages/new-task/new-task.module').then( m => m.NewTaskPageModule)
      },
      {
        path: '**',
        redirectTo: 'projects',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardMenuTabsPageRoutingModule {}
