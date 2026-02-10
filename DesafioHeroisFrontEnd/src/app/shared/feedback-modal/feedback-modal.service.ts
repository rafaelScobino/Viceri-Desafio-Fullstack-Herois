import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FeedbackModalComponent } from './feedback-modal.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FeedbackModalService {
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  showSuccess(msg: string) {
    this.open('Sucesso!', msg, 'bi bi-check-circle-fill', 'text-success', 'btn-success');
  }

  showError(msg: string) {
    this.open('Erro!', msg, 'bi bi-exclamation-octagon-fill', 'text-danger', 'btn-danger');
  }

  showWarning(msg: string) {
    this.open('Aviso', msg, 'bi bi-exclamation-triangle-fill', 'text-warning', 'btn-warning');
  }

  showConfirm(title: string, msg: string): Observable<boolean> {
    const initialState = {
      title,
      message: msg,
      icon: 'bi bi-question-circle-fill',
      textColor: 'text-primary',
      btnClass: 'btn-primary',
      isConfirm: true // Nova flag para mostrar o botão "Cancelar"
    };

    this.bsModalRef = this.modalService.show(FeedbackModalComponent, {
      initialState,
      class: 'modal-dialog-centered'
    });

   const modalComponent = this.bsModalRef.content as FeedbackModalComponent;
  return modalComponent.confirmResult.asObservable();
  }

  private open(title: string, message: string, icon: string, textColor: string, btnClass: string) {
    const initialState = {
      title,
      message,
      icon,
      textColor,
      btnClass
    };

    this.bsModalRef = this.modalService.show(FeedbackModalComponent, {
      initialState,
      class: 'modal-dialog-centered'
    });
  }
}
