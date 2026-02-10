import { Component, Input } from '@angular/core';
import { Heroi } from '../../models/heroi';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css'
})
export class HeroCardComponent {
@Input() hero?: Heroi;
}
