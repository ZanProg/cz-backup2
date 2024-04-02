import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardsComponent } from './admin-dashboards/admin-dashboards.component';



@NgModule({
  declarations: [
    AdminDashboardsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdminDashboardsComponent
  ]
})
export class AdminDashboardModule { }
