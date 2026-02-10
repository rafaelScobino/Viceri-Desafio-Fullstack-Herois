import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';


@Component({
  selector: 'app-hero-modal',
  templateUrl: './hero-modal.component.html',
  styleUrl: './hero-modal.component.css'
})
export class HeroModalComponent {

@ViewChild('heroTemplate') heroTemplate!: TemplateRef<any>;
  hero?: Hero | null;

 modalRef?: BsModalRef;

constructor(
  private modalService: BsModalService,
  private heroService: HeroService
) {}

 open(heroId: number) {
  console.log(heroId)
    if (!heroId) return;

    this.heroService.getById(heroId).subscribe({
      next: (heroData) => {
        this.hero = Hero.map(heroData);
        this.modalRef = this.modalService.show(this.heroTemplate, {
          class: 'modal-lg modal-dialog-centered',
          animated: true
        });
      },
      error: (err) => {
        console.error('Erro ao buscar detalhes do herói', err);
      }
    });
  }

close() {
    this.modalRef?.hide();
  }


}


















export const HEROI_DETALHE_MOCK = {
  id: 10,
  name: 'Peter Parker',
  heroName: 'Homem-Aranha',
  birth: '2001-08-10T00:00:00',
  height: 1.78,
  weight: 74.5,
  heroPowers: [
    {
      power: { id: 1, name: 'Sentido Aranha' }
    },
    {
      power: { id: 2, name: 'Agilidade Sobre-humana' }
    },
    {
      power: { id: 3, name: 'Lançador de Teia' }
    }
  ]
};
