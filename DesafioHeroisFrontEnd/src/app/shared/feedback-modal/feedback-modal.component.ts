import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

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
isConfirm: boolean = false;
confirmResult = new Subject<boolean>();
  constructor(public bsModalRef: BsModalRef) {}

  close() {
    this.bsModalRef.hide();
  }

  confirm() {
    this.confirmResult.next(true);
    this.confirmResult.complete();
    this.bsModalRef.hide();
  }

  decline() {
    this.confirmResult.next(false);
    this.confirmResult.complete();
    this.bsModalRef.hide();
  }

}
