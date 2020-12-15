import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/todo-details/todo-details.module').then( m => m.TodoDetailsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/todo-details/todo-details.module').then( m => m.TodoDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard-menu-tabs',
    loadChildren: () => import('./modules/dashboard/pages/dashboard-menu-tabs/dashboard-menu-tabs.module').then( m => m.DashboardMenuTabsPageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./modules/dashboard/pages/projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'project-details',
    loadChildren: () => import('./modules/dashboard/pages/project-details/project-details.module').then( m => m.ProjectDetailsPageModule)
  },
  {
    path: 'new-project',
    loadChildren: () => import('./modules/dashboard/pages/new-project/new-project.module').then( m => m.NewProjectPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
