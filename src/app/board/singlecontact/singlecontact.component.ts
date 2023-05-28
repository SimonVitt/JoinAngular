import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ManagePopupsService } from '../services/manage-popups.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-singlecontact',
  templateUrl: './singlecontact.component.html',
  styleUrls: ['./singlecontact.component.scss']
})
export class SinglecontactComponent {
  @Input() user!: User;
  @Output() userChange = new EventEmitter<undefined>();

  constructor(private managePopups: ManagePopupsService){}

  showAddTask(){
    this.managePopups.triggerShowAddTaskDialog(true, 'todo');
  }

  hideSingleContact(){
    this.userChange.emit(undefined);
  }

}
