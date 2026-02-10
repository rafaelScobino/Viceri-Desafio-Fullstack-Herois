import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { HeroModalComponent } from './hero-modal/hero-modal.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FeedbackModalComponent,
    FooterComponent,
    HeaderComponent,
    HeroCardComponent,
    HeroModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
     FeedbackModalComponent,
    FooterComponent,
    HeaderComponent,
    HeroCardComponent,
    HeroModalComponent
  ]
})
export class SharedModule { }
