import { Component } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import { ManagePopupsService } from '../services/manage-popups.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  users: Array<User> = [];
  userSelected: User | undefined;

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
