import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-addboarddialog',
  templateUrl: './addboarddialog.component.html',
  styleUrls: ['./addboarddialog.component.scss']
})
export class AddboarddialogComponent {
  @Output() closeDialog = new EventEmitter<boolean>();
  allusers: any;
  @Input() id!: string;
  assignedUsers: Array<number> = [];
  boardname: string = '';
  openContacts: boolean = false;
  showPopUpInput: boolean = false;
  @ViewChild('popUpText') popUpText!: ElementRef;

  constructor(private dataS: GetDataService) { }

  closeDialogF() {
    this.closeDialog.emit(false);
  }

  async ngOnInit() {
    this.assignedUsers.push(+this.id);
    try {
      this.allusers = await this.dataS.getAllUsers();
    } catch (e) {
      this.sthWentWrong();
    }
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
    console.log(checked);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  closeAlert(event: Event) {
    event.stopPropagation();
    this.showPopUpInput = false;
  }
  createBoard() {
    if (this.checkInput()) {
      this.sendBoardReq();
    } else {
      this.showPopUpInput = true;
      this.popUpText.nativeElement.innerHTML = 'Please fill out everything!';
    }

  }

  sthWentWrong() {
    this.showPopUpInput = true;
    this.popUpText.nativeElement.innerHTML = 'Something went wrong! Try again!';
  }

  async sendBoardReq() {
    const jsonData = {
      "name": this.boardname,
      "board_users": this.assignedUsers
    };
    try {
      this.dataS.createBoard(jsonData);
      location.reload();
    } catch (e) {
      this.sthWentWrong();
    }
  }

  checkInput() {
    if (this.assignedUsers.length > 0 && this.boardname.length > 0) {
      return true;
    }
    return false
  }

}
