import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-addboarddialog',
  templateUrl: './addboarddialog.component.html',
  styleUrls: ['./addboarddialog.component.scss']
})
export class AddboarddialogComponent {
  @Output() closeDialog = new EventEmitter<boolean>();
  allusers: any;
  username!: string;
  assignedUsers: Array<number> = [];
  boardname: string = '';
  openContacts: boolean = false;
  showPopUpInput: boolean = false;
  @ViewChild('popUpText') popUpText!: ElementRef;

  constructor(private dataS: GetDataService, private loadingService: LoadingService) {
    this.username = this.getUsername()!;

  }

  closeDialogF() {
    this.closeDialog.emit(false);
  }

  async ngOnInit() {
    this.allusers = await this.dataS.getAllUsers();
    let myUser = this.allusers.filter((user: any) => {
      return user.username === this.username;
    });
    console.log(myUser);
    console.log(this.allusers);
    this.assignedUsers.push(myUser[0].id);
  }

  selectContact(id: number) {
    let inputElement: HTMLInputElement = document.getElementById(`input-contact${id}`) as HTMLInputElement;
    if (inputElement.checked) {
      let index = this.assignedUsers.indexOf(id);
      this.assignedUsers.splice(index, 1);
      inputElement.checked = false;
    } else {
      inputElement.checked = true;
      this.assignedUsers.push(id);
    }
  }

  setAllSelectedUser() {
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  closeAlert(event: Event) {
    event.stopPropagation();
    this.showPopUpInput = false;
  }

  async createBoard() {
    this.loadingService.setLoading(true);
    const jsonData = {
      "name": this.boardname,
      "board_users": this.assignedUsers
    };
    await this.dataS.createBoard(jsonData);
    location.reload();
  }

  getUsername() {
    if (localStorage.getItem('username')) {
      return localStorage.getItem('username');
    } else {
      return sessionStorage.getItem('username');
    }
  }

}
