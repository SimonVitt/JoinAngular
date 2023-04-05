import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ManagePopupsService } from '../services/manage-popups.service';

@Component({
  selector: 'app-singlecontact',
  templateUrl: './singlecontact.component.html',
  styleUrls: ['./singlecontact.component.scss']
})
export class SinglecontactComponent {
  @Input() user: any;
  @Output() userChange = new EventEmitter<any>();

  constructor(private managePopups: ManagePopupsService){}

  showAddTask(){
    this.managePopups.triggerShowAddTaskDialog(true, 'todo');
  }

  hideSingleContact(){
    this.userChange.emit(undefined);
  }

}
