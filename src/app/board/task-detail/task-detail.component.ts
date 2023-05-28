import { Component } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ManagePopupsService } from '../services/manage-popups.service';
import { SharedDataService } from '../services/shared-data.service';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  task!: Task;
  showDelete: boolean = false;

  constructor(private managePopups: ManagePopupsService, private dataService: GetDataService, private sharedData: SharedDataService, private loadingService: LoadingService){}

  ngOnInit(){
    this.managePopups.openedTask.subscribe((task) => {
      if(task){
        this.task = task;
      }
    });
  }

  closeCard(){
    this.managePopups.triggerShowTaskDetail(false, null);
  }

  closeDelete(event: Event){
    this.showDelete = false;
    event.stopPropagation();
  }

  stopPropagation(event: Event){
    event.stopPropagation();
  }

  async deleteTask(){
    this.loadingService.setLoading(true);
    await this.dataService.deleteTask(this.task.id!);
    this.managePopups.triggerShowTaskDetail(false, null);
    await this.sharedData.setTasks();
    this.loadingService.setLoading(false);
  }

  showEditTask(){
    this.managePopups.triggerEditTask(true, this.task);
  }
}
