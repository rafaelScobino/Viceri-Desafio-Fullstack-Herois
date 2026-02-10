import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HeroFormComponent } from "./components/hero-form/hero-form.component";
import { HeroService } from '../../services/hero.service';
import { FeedbackModalService } from '../../shared/feedback-modal/feedback-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../models/hero';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


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
  hero?: Hero;
  isEdit = false;


  constructor(
    private heroService: HeroService,
    private feedbackService: FeedbackModalService,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) {}

 ngOnInit(): void {
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

  private loadHeroData(id: number | string): void {
    this.heroService.getById(id).subscribe({
      next: (hero: Hero) => {
        this.heroForm.fillForm(hero);
      },
      error: (err) => {
        this.feedbackService.showError('Heroi não encontrado!');
        // this.router.navigate(['/herois']);
      }
    });
  }

  saveHero() {
  const data = this.heroForm.save();
  if (!data) return;
  const payload = Hero.mapOutput(data);


    this.heroService.create(data).subscribe({
      next: () => {
        this.feedbackService.showSuccess('Herói cadastrado com sucesso!');
        this.router.navigate(['/herois']);
      },
      error: (err: any) => {
        console.error(err);
        this.feedbackService.showError('Ocorreu um erro ao salvar o herói. Verifique os dados.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/herois']);
  }

  showForm(){
    return (!!this.hero && !!this.isEdit) || !this.isEdit
  }

  formInvalid(){
    return this.heroForm?.heroForm?.invalid
  }
}
