import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HeroFormComponent } from "./components/hero-form/hero-form.component";
import { HeroiService } from '../../services/heroi/heroi.service';
import { FeedbackModalService } from '../../shared/feedback-modal/feedback-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroi } from '../../models/heroi';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Superpoder } from '../../models/superpoder';
import { SuperpoderService } from '../../services/superpoder/superpoder.service';


@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [CommonModule,HeroFormComponent],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroFormRef') heroForm! : HeroFormComponent;

  private routeSub?: Subscription;
  hero?: Heroi;
  isEdit = false;
  powerList: Superpoder[] = [];
  isFormValid:boolean = false;

  constructor(
    private heroService: HeroiService,
    private superpoderService: SuperpoderService,
    private feedbackService: FeedbackModalService,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) {}

 ngOnInit(): void {
  this.loadPowers();

  this.routeSub = this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      this.isEdit = true;
      this.loadHeroData(id);
    }
  });
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private loadPowers(): void {
  this.superpoderService.getAll().subscribe({
    next: (powers) => {
      this.powerList = powers;
    },
    error: () => this.feedbackService.showError('Erro ao carregar lista de poderes.')
  });
}

  private loadHeroData(id: number | string): void {
    this.heroService.getById(id).subscribe({
      next: (hero: Heroi) => {
      setTimeout(() => {
        this.hero = hero;
        this.cdRef.detectChanges();
      });
      },
      error: (err) => {
         const errorMessage = err.error?.mensagem || 'Heroi não encontrado!';
        this.feedbackService.showError(errorMessage);
        console.error(err);
      }
    });
  }

  saveHero() {
  const data = this.heroForm.save();
  if (!data) return;

  const payload = Heroi.mapOutput(data);

  if (this.isEdit && this.hero) {
    this.heroService.update(this.hero.id, payload).subscribe({
      next: () => {
        this.feedbackService.showSuccess('Herói atualizado com sucesso!');
        this.router.navigate(['/herois']);
      },
      error: (err) => {
        const errorMessage = err.error?.mensagem || 'Erro ao atualizar herói.';
        this.feedbackService.showError(errorMessage);
        console.error(err);
      }
    });
  } else {

    this.heroService.create(payload).subscribe({
      next: () => {
        this.feedbackService.showSuccess('Herói cadastrado com sucesso!');
        this.router.navigate(['/herois']);
      },
      error: (err) => {
        const errorMessage = err.error?.mensagem || 'Erro ao cadastrar herói.';
        this.feedbackService.showError(errorMessage);
        console.error(err);
      }
    });
  }
}


  cancel() {
    this.router.navigate(['/herois']);
  }

  showForm(){
    return (!!this.hero && !!this.isEdit) || !this.isEdit
  }

  handleStatusChange(valid: boolean) {
  this.isFormValid = valid;
  this.cdRef.detectChanges();
}

}
