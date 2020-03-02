import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
//import { UserTableService } from '../../../users/user-table/user-table.service';
import { CaseListService } from '../../case-list.service';

@Component({
  moduleId: module.id,
  selector: 'asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})

export class AssetDetailComponent implements OnInit {

  _assigneeNameList: any[] = [];
  previousAssignee: any [] = [];

  @Input()
  public assigneeParameter: FormGroup;

  public assigneeId: AbstractControl;
  public assigneeComment: AbstractControl;

  @Input()
  public selectedIds: string[];

  @Input()
  public isView: boolean;

  @Input()
  set assigneeNameList(assigneeNameList: any[]) {
      this._assigneeNameList = assigneeNameList ? assigneeNameList : [];
  }

  @Output()
  remove: EventEmitter<any> = new EventEmitter();

  constructor(private caseListService: CaseListService) {
  }

  ngOnInit() {
      this.assigneeId = this.assigneeParameter.controls['assigneeId'];
      this.assigneeComment = this.assigneeParameter.controls['assigneeComment'];

      if (this.isView) {
          this.assigneeParameter.disable();
      }

     
  }

  handleRemove() {
      this.remove.emit();
  }

}
