import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetClassService } from '../asset-class.service';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset-class.component.html',
  styleUrls: ['./create-asset-class.component.scss']
})
export class CreateAssetClassComponent implements OnInit {

  @Output() emitService = new EventEmitter<any>();

  actionBtnLabel: string = "Save";
  modalHeader: string;

  assetClassListFormGroup: FormGroup;
  assetClassId: AbstractControl;
  assetClassName: AbstractControl;
  assetClassDesc: AbstractControl;

  save = true;
  errorMsg: string;
  saveButton = false;
  view = false;


  initForm(){
    this.assetClassListFormGroup = this.formBuilder.group({
      'assetClassId' : [''],
      'assetClassName': ['',Validators.required],
      'assetClassDesc': ['',Validators.required]
    });

    this.assetClassId = this.assetClassListFormGroup.controls['assetClassId'];
    this.assetClassName = this.assetClassListFormGroup.controls['assetClassName'];
    this.assetClassDesc = this.assetClassListFormGroup.controls['assetClassDesc'];
  }
  // sites: CreateAsset[] = [
  //   { siteName: 'Marcus Colletrell' },
  //   { siteName: 'Steven Phillips' },

  // ];


  constructor(private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute, private activeModal: NgbActiveModal, 
    private service: AssetClassService) {
      this.initForm();
     }

  ngOnInit() {
  }

  submitForm(){
    this.saveButton = true;
    this.errorMsg = undefined;

    if (!this.errorMsg) {
      if (this.save) {

        this.service.createAssetClass(this.assetClassListFormGroup.value).subscribe(val => {
            this.emitService.emit('Y');
            this.activeModal.close();
          }, error => {
            this.saveButton = false;
            console.log("error is : " + error);
          });
      } 
  }

  

  }

  closeModal(){
    this.activeModal.close();
    this.assetClassListFormGroup.markAsPristine();
  }
  }


