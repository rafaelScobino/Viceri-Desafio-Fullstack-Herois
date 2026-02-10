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
@Output() onView = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  constructor(){

  }

 heroDetail(id?: number) {
    if (id) this.onView.emit(id);
  }

  editHero(id?: number) {
    if (id) this.onEdit.emit(id);
  }

  deleteHero(id?: number) {
    if (id) this.onDelete.emit(id);
  }
}
