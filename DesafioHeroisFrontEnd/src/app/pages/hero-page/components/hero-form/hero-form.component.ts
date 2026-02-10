import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SUPERPODERES_MOCK } from '../../../list-page/list-page.component';
import { Hero } from '../../../../models/hero';

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
      name: ['', [Validators.required, Validators.minLength(3)]],
      heroName: ['', Validators.required],
      birth: ['', Validators.required],
      height: [null, [Validators.required, Validators.min(0.1)]],
      weight: [null, [Validators.required, Validators.min(1)]],
      powers: [[], Validators.required]
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

  fillForm(hero:Hero){
       const powerIds = hero.heroPowers?.map(p => p.id) || [];

        this.heroForm.patchValue({
          nome: hero.name,
          nomeHeroi: hero.heroName,
          dataNascimento: hero.birth,
          altura: hero.height,
          peso: hero.weight,
          powers: powerIds
        });
  }

  togglePower(id: number) {
    const selected = [...this.heroForm.value.powers];
    const index = selected.indexOf(id);

    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(id);
    }

    this.heroForm.get('powers')?.setValue(selected);
    this.heroForm.get('powers')?.markAsTouched();
  }

  isSelected(id: number): boolean {
    return this.heroForm.value.powers?.includes(id);
  }
}
