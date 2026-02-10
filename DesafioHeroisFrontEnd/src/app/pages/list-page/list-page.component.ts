import { Component, ViewChild } from '@angular/core';
import { HeroListComponent } from "./components/hero-list/hero-list.component";
import { HeroListFilterComponent } from "./components/hero-list-filter/hero-list-filter.component";
import { HeroiService } from '../../services/heroi/heroi.service';
import { CommonModule } from '@angular/common';
import { FeedbackModalService } from '../../shared/feedback-modal/feedback-modal.service';
import { SharedModule } from '../../shared/shared.module';
import { HeroModalComponent } from '../../shared/hero-modal/hero-modal.component';
import { SuperpoderService } from '../../services/superpoder/superpoder.service';
import { Router } from '@angular/router';

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

  heroes: any[] = [];
  powerList: any[] = [];

  constructor(
    private heroService: HeroiService,
    private superpoderService: SuperpoderService,
    private feedbackService: FeedbackModalService,
    private router: Router

  ) {}

  ngOnInit() {
    this.getHeros();
  }

  getHeros() {
    this.heroService.getAll().subscribe(res => {
      this.heroes = res;
       console.log(this.heroes)
    });

    this.superpoderService.getAll().subscribe(res => this.powerList = res);
  }

  filter(event: any) {
   this.heroService.getAllFiltered(event.name, event.poderId)
    .subscribe({
      next: (data) => {
        this.heroes = data;
        console.log(this.heroes)
      },
      error: (err) => {
        this.heroes=[]
        console.error('Error fetching heroes', err);
        this.feedbackService.showError('Erro ao carregar a lista filtrada.');
      }
    });
  }

  heroDetail(hero: any) {
    this.modalHero.open(hero);
  }
  editHero(id: number) {

    this.router.navigate(['/heroi/edicao', id]);
  }

  hasResult(){
    return !!this.heroes && this.heroes?.length > 0;
  }

deleteHero(id: number) {
    this.feedbackService.showConfirm('Atenção!', 'Deseja realmente remover este herói do esquadrão?')
      .subscribe({
        next: (confirmed) => {
          if (confirmed) {
            this.executeDelete(id);
          }
        }
      });
  }

private executeDelete(id: number) {
  this.heroService.delete(id).subscribe({
    next: () => {
       this.heroes = this.heroes.filter(h => h.id !== id);
       this.feedbackService.showSuccess('Removido com sucesso');
    },
    error: () => this.feedbackService.showError('Erro ao deletar')
  });
}

  noResultFilter(){
    this.heroFilter.clearFilters()
  }

}

