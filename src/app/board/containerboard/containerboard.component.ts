import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';
import { ManagePopupsService } from '../services/manage-popups.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-containerboard',
  templateUrl: './containerboard.component.html',
  styleUrls: ['./containerboard.component.scss']
})
export class ContainerboardComponent {
  boardname: string;
  tasks: Array<any> | undefined;
  statusToCreate: string = 'todo';

  showTaskDetail: boolean = false;
  showAddTaskDialog: boolean = false;
  taskadded: boolean = false;
  showEditTask: boolean = false;
  addUser: boolean = false;

  constructor(private route: ActivatedRoute, private sharedData: SharedDataService, private managePopupsS: ManagePopupsService){
    this.boardname = this.route.snapshot.paramMap.get('boardname')!;
    this.managePopupsS.showAddTaskDialogS.subscribe((status) => {
      this.showAddTaskDialog = status[0];
      this.statusToCreate = status[1];
    });
    this.managePopupsS.showTaskDetailS.subscribe((status) => {
      this.showTaskDetail = status;
    });
    this.managePopupsS.taskAddedSubject.subscribe((show) => {
      this.taskadded = show;
    });
    this.managePopupsS.editTaskSubject.subscribe((show) => {
      this.showEditTask = show;
    });
    this.managePopupsS.addContactSubject.subscribe((show) => {
      this.addUser = show;
    })
  }

  async ngOnInit(){
    this.sharedData.setBoardname(this.boardname);
    await this.sharedData.setTasks();
    await this.sharedData.setCategories();
    await this.sharedData.setUsers();
    this.tasks = this.sharedData.allTasks;
  }

  closeCard(){
    this.showAddTaskDialog = false;
    this.showTaskDetail = false;
    this.addUser = false;
  }

  closeCardEdit(){
    this.showEditTask = false;
  }
}
