import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.scss']
})
export class CommonModalComponent implements OnInit {
  modalHeader: string;

  showHide: boolean;

  modalContent: string;

  oKMessage: string = 'OK';

  cancelMessage: string = 'Cancel';

  showInputText: boolean = false;
  placeholderContent: string = '';
  inputContent: string = '';
  input: string= '';

  @Output() emitService = new EventEmitter();

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() { }


  cancelModal() {
    this.activeModal.close('N');
  }

  okModal() {
    
    if(this.showInputText) {
      this.activeModal.close(this.inputContent);
    } else {
      this.activeModal.close('Y');
    }
    
  }
}



