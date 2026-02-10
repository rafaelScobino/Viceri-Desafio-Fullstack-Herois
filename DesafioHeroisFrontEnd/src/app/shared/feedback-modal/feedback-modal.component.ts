import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrl: './feedback-modal.component.css'
})
export class FeedbackModalComponent {
  title: string = '';
  message: string = '';
  icon: string = '';
  textColor: string = '';
  btnClass: string = '';

  constructor(public bsModalRef: BsModalRef) {}

  close() {
    this.bsModalRef.hide();
  }

}
