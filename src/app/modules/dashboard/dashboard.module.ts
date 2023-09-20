import { dashboard_routes } from './dashboard.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar'
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import {ChartModule} from "primeng/chart";


@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(dashboard_routes),
    SidebarModule,
    ButtonModule,
    CardModule,
    ToastModule,
    ToolbarModule,
    ChartModule
  ],
  providers: [MessageService, CookieService],
})
export class DashboardModule { }
