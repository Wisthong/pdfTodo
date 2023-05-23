import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { VendedoresComponent } from './modules/home/vendedores/vendedores.component';
import { CartalaboralComponent } from './modules/home/cartalaboral/cartalaboral.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'vendedores',
        component: VendedoresComponent,
        title: 'Vendedores',
      },
      {
        path: 'cartalaboral/:id',
        component: CartalaboralComponent,
        title: 'Carta Laboral',
      },
    ],
  },
];
