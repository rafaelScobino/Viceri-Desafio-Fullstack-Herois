import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Heroi } from '../../models/heroi';
import { HeroiService } from '../../services/heroi/heroi.service';
import { FeedbackModalService } from '../feedback-modal/feedback-modal.service';


@Component({
  selector: 'app-hero-modal',
  templateUrl: './hero-modal.component.html',
  styleUrl: './hero-modal.component.css'
})
export class HeroModalComponent {

@ViewChild('heroTemplate') heroTemplate!: TemplateRef<any>;
  hero?: Heroi | null;

 modalRef?: BsModalRef;

constructor(
  private modalService: BsModalService,
  private heroService: HeroiService,
  private feedbackService: FeedbackModalService,
) {}

 open(heroId: number) {
    if (!heroId) return;

    this.heroService.getById(heroId).subscribe({
      next: (heroData) => {
        this.hero = Heroi.map(heroData);
        this.modalRef = this.modalService.show(this.heroTemplate, {
          class: 'modal-lg modal-dialog-centered',
          animated: true
        });
      },
      error: (err) => {
        console.error('"Error fetching hero details', err);
         this.feedbackService.showError(err?.error?.mensagem? err?.error?.mensagem: 'Erro ao buscar detalhes do herói');
      }
    });
  }

close() {
    this.modalRef?.hide();
  }


}


















export const HEROI_DETALHE_MOCK = {
  id: 10,
  nome: 'Peter Parker',
  nomeHeroi: 'Homem-Aranha',
  dataNascimento: '2001-08-10T00:00:00',
  altura: 1.78,
  peso: 74.5,
  heroiSuperpoderes: [
    {
      power: { id: 1, nome: 'Sentido Aranha' }
    },
    {
      power: { id: 2, nome: 'Agilidade Sobre-humana' }
    },
    {
      power: { id: 3, nome: 'Lançador de Teia' }
    }
  ]
};
