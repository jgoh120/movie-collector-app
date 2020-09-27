import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmPromptModalComponent, ConfirmPromptModalConfiguration } from './confirm-prompt-modal/confirm-prompt-modal.component';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private modalService: NgbModal,
  ) { }

  public async presentConfirmModal(config: ConfirmPromptModalConfiguration){ 
    const modal = this.modalService.open(ConfirmPromptModalComponent, {
      size: 'lg'
    });
    modal.componentInstance.config = config;
  };
}

