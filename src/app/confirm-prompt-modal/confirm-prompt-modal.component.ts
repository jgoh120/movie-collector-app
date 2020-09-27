import { Component, OnInit, Input } from '@angular/core';
import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'abc-confirm-prompt-modal',
  templateUrl: './confirm-prompt-modal.component.html',
  styleUrls: ['./confirm-prompt-modal.component.scss']
})
export class ConfirmPromptModalComponent implements OnInit {

  @Input()
  config: ConfirmPromptModalConfiguration;

  constructor(
    private modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  confirm(){
    this.config.confirm.handler();
    this.modal.close();
  }

  cancel(){
    this.config.cancel.handler();
    this.modal.close();
  }

  close(){
    this.modal.close();
  }
}

export type ConfirmPromptModalConfiguration = {
  title: string;
  description: string;
  confirm: {
    label: string;
    handler: Function;
  }
  cancel: {
    label: string;
    handler: Function;
  }
}
