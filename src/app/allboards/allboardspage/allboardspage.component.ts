import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-allboardspage',
  templateUrl: './allboardspage.component.html',
  styleUrls: ['./allboardspage.component.scss']
})
export class AllboardspageComponent {
  dialogOpen: boolean = false;
  boards: any = [];

  constructor(private data: GetDataService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.boards = await this.data.getAllBoardsOfUser();
  }

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/login')
  }
}
