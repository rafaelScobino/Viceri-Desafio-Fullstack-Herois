import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Heroi } from '../../../../models/heroi';
import { startWith, Subscription } from 'rxjs';
import { Superpoder } from '../../../../models/superpoder';

@Component({
  selector: 'app-hero-form',
  standalone: true,
 imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent {
heroForm!: FormGroup;
@Input() powerList: Superpoder[] = [];;
@Input() set initialData(value: Heroi | undefined) {
  if (value) {
    this.fillForm(value);
  }
}

@Output() onStatusChange = new EventEmitter<boolean>();

private heroSubscription?: Subscription;

  constructor(private fb: FormBuilder) {
      this.heroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      nomeHeroi: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      altura: [null, [Validators.required, Validators.min(0.1)]],
      peso: [null, [Validators.required, Validators.min(1)]],
      heroiSuperpoderes: [[], Validators.required]
    });
  }

ngOnInit(): void {
  this.heroSubscription = this.heroForm.statusChanges
    .pipe(startWith(this.heroForm.status))
    .subscribe(() => {
      this.onStatusChange.emit(this.heroForm.valid);
    });
}

ngOnDestroy() {
  this.heroSubscription?.unsubscribe();
}

  get formData() {
    return this.heroForm?.value;
  }

  get isValid() {
    return this.heroForm?.valid;
  }

  get hasPower(){
    return this.heroForm?.value?.heroiSuperpoderes?.length > 0
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
    console.log(hero)
       const powerIds = hero.heroiSuperpoderes?.map(p => p.id) || [];
console.log(powerIds)
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
