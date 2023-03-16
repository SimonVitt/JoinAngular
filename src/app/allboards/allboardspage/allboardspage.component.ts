import { Component } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-allboardspage',
  templateUrl: './allboardspage.component.html',
  styleUrls: ['./allboardspage.component.scss']
})
export class AllboardspageComponent {
  dialogOpen: boolean = false;
  boards: any = [];
  id!: string;

  constructor(private data: GetDataService) { }

  async ngOnInit() {
    this.boards = await this.data.getAllBoardsOfUser();
  }
}
