import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from '../landingPage/landingPage.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  // { path: '**', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'user-info',
    component: UserInfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomRoutingModule { }
