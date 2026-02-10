import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SUPERPODERES_MOCK } from '../../../list-page/list-page.component';
import { Heroi } from '../../../../models/heroi';

@Component({
  selector: 'app-hero-form',
  standalone: true,
 imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent {
heroForm!: FormGroup;
powerList = SUPERPODERES_MOCK;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      nomeHeroi: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      altura: [null, [Validators.required, Validators.min(0.1)]],
      peso: [null, [Validators.required, Validators.min(1)]],
      heroiSuperpoderes: [[], Validators.required]
    });
  }


  get formData() {
    return this.heroForm.value;
  }

  get isValid() {
    return this.heroForm.valid;
  }

  reset() {
    this.heroForm.reset();
  }

  save(){
    if (this.heroForm.invalid) {
    this.heroForm.markAllAsTouched();
    return null;
  }
  return this.heroForm.value;
  }

  fillForm(hero:Heroi){
       const powerIds = hero.heroiSuperpoderes?.map(p => p.id) || [];

        this.heroForm.patchValue({
          nome: hero.nome,
          nomeHeroi: hero.nomeHeroi,
          dataNascimento: hero.dataNascimento,
          altura: hero.altura,
          peso: hero.peso,
          heroiSuperpoderes: powerIds
        });
  }

  togglePower(id: number) {
    const selected = [...this.heroForm.value.heroiSuperpoderes];
    const index = selected.indexOf(id);

    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(id);
    }

    this.heroForm.get('heroiSuperpoderes')?.setValue(selected);
    this.heroForm.get('heroiSuperpoderes')?.markAsTouched();
  }

  isSelected(id: number): boolean {
    return this.heroForm.value.heroiSuperpoderes?.includes(id);
  }
}
