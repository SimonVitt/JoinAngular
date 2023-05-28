import { Component } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { SharedDataService } from '../services/shared-data.service';
import { ManagePopupsService } from '../services/manage-popups.service';
import { LoadingService } from 'src/app/services/loading.service';
import { BoardinfoService } from 'src/app/services/boardinfo.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  allUsers: Array<User> = [];
  openContacts: boolean = false;
  members: Array<User> = [];
  newMembers: Array<number> = [];
  boardId: number| undefined;
  
  constructor(private boardInfo: BoardinfoService,private dataService: GetDataService, private sharedData: SharedDataService, private managePopups: ManagePopupsService, private loadingService: LoadingService){}

  async ngOnInit(){
    this.boardInfo.boardIdBSubject.subscribe((id)=> {
      this.boardId = id;
    })
    this.allUsers = await this.dataService.getAllUsers() as Array<User>;
    this.members = await this.dataService.getUsers() as Array<User>;
    this.members.forEach((member) => {
      this.selectContact(member.id);
    });
  }

  selectContact(id: number) {
    let inputElement: HTMLInputElement = document.getElementById(`input-contact${id}`) as HTMLInputElement;
    if (inputElement.checked) {
      let index = this.newMembers.indexOf(id);
      this.newMembers.splice(index, 1);
      inputElement.checked = false;
    } else {
      inputElement.checked = true;
      this.newMembers.push(id);
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  closeAddContact(){
    this.managePopups.triggerAddUser(false);
  }

  async updateMembers(){
    this.loadingService.setLoading(true);
    const body = {
      "board_users": this.newMembers
    };
    this.boardId = +sessionStorage.getItem('board')!;
    await this.dataService.editBoard(body);
    await this.sharedData.setUsers();
    this.managePopups.triggerAddUser(false);
    this.loadingService.setLoading(false);
  }

}
