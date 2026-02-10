import { Component, ViewChild } from '@angular/core';
import { HeroListComponent } from "./components/hero-list/hero-list.component";
import { HeroListFilterComponent } from "./components/hero-list-filter/hero-list-filter.component";
import { HeroService } from '../../services/hero.service';
import { CommonModule } from '@angular/common';
import { FeedbackModalService } from '../../shared/feedback-modal/feedback-modal.service';
import { SharedModule } from '../../shared/shared.module';
import { HeroModalComponent } from '../../shared/hero-modal/hero-modal.component';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CommonModule, HeroListFilterComponent, HeroListComponent,SharedModule],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent {

@ViewChild('HeroModalComponent') modalHero!: HeroModalComponent;
@ViewChild('heroFilter') heroFilter!: HeroListFilterComponent;

  heroes: any[] = HEROIS_MOCK;
  powerList: any[] = SUPERPODERES_MOCK;

  constructor(
    private heroService: HeroService,
    private feedbackService: FeedbackModalService

  ) {}

  ngOnInit() {
    this.getHeros();
  }

  getHeros() {
    this.heroService.listAll().subscribe(res => {
      this.heroes = res;
    });

    this.heroService.listPowers().subscribe(res => this.powerList = res);
  }

  filter(event: any) {
   this.heroService.listFiltered(event.name, event.powerId)
    .subscribe({
      next: (data) => {
        this.heroes = data;
      },
      error: (err) => {
        console.error('Error fetching heroes', err);
        this.feedbackService.showError('Erro ao carregar a lista filtrada.');
      }
    });
  }

  heroDetail(hero: any) {
    this.modalHero.open(hero);
  }

  hasResult(){
    return !!this.heroes && this.heroes?.length > 0;
  }

  noResult(){
    this.heroFilter.clearFilters()
  }

}

export const SUPERPODERES_MOCK = [
  { id: 1, name: 'Voo' },
  { id: 2, name: 'Super Força' },
  { id: 3, name: 'Invisibilidade' },
  { id: 4, name: 'Telepatia' },
  { id: 5, name: 'Velocidade' }
];

export const HEROIS_MOCK = [
  {
    id: 1,
    name: 'Bruce Wayne',
    heroName: 'Batman',
    birth: '1939-05-27',
    height: 1.88,
    weight: 95.0,
    heroPowers: [
      { id: 2, name: 'Super Força' }
    ]
  },
  {
    id: 2,
    name: 'Clark Kent',
    heroName: 'Superman',
    birth: '1938-04-18',
    height: 1.91,
    weight: 107.0,
    heroPowers: [{ id: 1, name: 'Voo' } ,
     { id: 2, name: 'Super Força' }
    ]
  },
  {
    id: 3,
    name: 'Diana Prince',
    heroName: 'Mulher Maravilha',
    birth: '1941-10-21',
    height: 1.83,
    weight: 75.0,
    heroPowers: [
    { id: 1, name: 'Voo' },
      { id: 2, name: 'Super Força' }
    ]
  },
  {
    id: 4,
    name: 'Barry Allen',
    heroName: 'Flash',
    birth: '1956-01-01',
    height: 1.80,
    weight: 80.0,
    heroPowers: [
  { id: 5, name: 'Velocidade' }
    ]
  }
];
