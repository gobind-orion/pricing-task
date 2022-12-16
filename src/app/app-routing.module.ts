import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./user-info/user-info.module').then(m => m.UserInfoModule) },
  // { path: 'user-info', loadChildren: () => import('./moduleb/moduleb.module').then(m => m.ModulebModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
