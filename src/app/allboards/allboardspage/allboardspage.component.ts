import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-allboardspage',
  templateUrl: './allboardspage.component.html',
  styleUrls: ['./allboardspage.component.scss']
})
export class AllboardspageComponent {
  dialogOpen:boolean = false;
  boards: any;
  id!:string;

  constructor(private route: ActivatedRoute, private data: GetDataService){}

  async ngOnInit(){
    try{
      this.boards = await this.data.getAllBoardsOfUser();
    }catch(e){
      console.log(e);
      //show somethings wrong
    }
    
  }
}
