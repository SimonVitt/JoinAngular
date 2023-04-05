import { Component } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import { ManagePopupsService } from '../services/manage-popups.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  users: Array<any> = [];
  userSelected: any;

  constructor(private sharedData: SharedDataService, private managePopups: ManagePopupsService){}

  ngOnInit(){
    this.sharedData.usersBSubject.subscribe((users) => {
      this.users = users;
    });
  }

  openAddContact(){
    this.managePopups.triggerAddUser(true);
  }

}
