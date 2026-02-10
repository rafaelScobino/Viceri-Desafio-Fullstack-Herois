import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-list-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-list-filter.component.html',
  styleUrl: './hero-list-filter.component.css'
})
export class HeroListFilterComponent {
@Input() powers: any[] = []; // Recebe a lista de poderes da API
  @Output() filterEvent = new EventEmitter<any>();

  filters = {
  name: '',
  poderId: null
};

  applyFilters() {
    this.filterEvent.emit(this.filters);
  }

  clearFilters(): void {
  this.filters = {
    name: '',
    poderId: null
  };
  this.applyFilters();
}
}
