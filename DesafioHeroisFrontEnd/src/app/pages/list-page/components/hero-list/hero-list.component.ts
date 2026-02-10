import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeedbackModalService } from '../../../../shared/feedback-modal/feedback-modal.service';
import { Heroi } from '../../../../models/heroi';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css'
})
export class HeroListComponent {
  @Input() heroes?: Heroi[]
  @Output() onViewHero = new EventEmitter<any>();

  constructor(private feedbackService: FeedbackModalService){

  }


  heroDetail(heroId?: number) {
    if(!heroId) return
    this.onViewHero.emit(heroId);
  }
}
