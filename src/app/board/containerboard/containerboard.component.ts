import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-containerboard',
  templateUrl: './containerboard.component.html',
  styleUrls: ['./containerboard.component.scss']
})
export class ContainerboardComponent {
  boardname: string;
  id: string;

  constructor(private route: ActivatedRoute, private dataService: GetDataService){
    this.boardname = this.route.snapshot.paramMap.get('boardname')!;
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  async ngOnInit(){
    
  }
}
