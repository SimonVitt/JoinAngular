import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/interfaces/board';
import { AuthService } from 'src/app/services/auth.service';
import { BoardinfoService } from 'src/app/services/boardinfo.service';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-allboardspage',
  templateUrl: './allboardspage.component.html',
  styleUrls: ['./allboardspage.component.scss']
})
export class AllboardspageComponent {
  dialogOpen: boolean = false;
  boards: Board[] = [];

  constructor(private data: GetDataService, private authService: AuthService, private router: Router, private boardInfo: BoardinfoService) { }

  async ngOnInit() {
    this.boards = await this.data.getAllBoardsOfUser() as Board[];
  }

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/login')
  }

  openBoard(id: number, name: string){
    this.boardInfo.setCurrentBoard(id);
    this.router.navigateByUrl(`/board/${name}`)
  }
}
