import { Routes } from '@angular/router';
import { AgencyDetailComponent } from './agency-detail/agency-detail.component';
import { AgencyListComponent } from './agency-list/agency-list.component';

export const routes: Routes = [
  { path: '', component: AgencyListComponent },
  { path: 'agency/:id', component: AgencyDetailComponent }
];
