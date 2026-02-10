import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

export const routes: Routes = [
 {
  path: '',
  component: LandingPageComponent
},
 {
  path: 'herois',
  component: ListPageComponent
},
  {
    path: 'heroi',
    children: [
      {
        path: 'cadastro',
        component: HeroPageComponent
      },
      {
        path: 'edicao/:id',
        component: HeroPageComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
