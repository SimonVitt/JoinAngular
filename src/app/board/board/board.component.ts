import { Component } from '@angular/core';
import { ManagePopupsService } from '../services/manage-popups.service';
import { SharedDataService } from '../services/shared-data.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { LoadingService } from 'src/app/services/loading.service';
import { GetDataService } from 'src/app/services/get-data.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  todoTasks!: Array<any>;
  progressTasks!: Array<any>;
  feedbackTasks!: Array<any>;
  doneTasks!: Array<any>;

  searchInput: string = '';

  constructor(private sharedData: SharedDataService, private managePopupsS: ManagePopupsService, private loadingService: LoadingService, private dataService: GetDataService) { }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.sharedData.todoTasksBSubject.subscribe((tasks: Array<any>) => {
      this.todoTasks = tasks;
      this.searchTask();
    });
    this.sharedData.progressTasksBSubject.subscribe((tasks: Array<any>) => {
      this.progressTasks = tasks;
      this.searchTask();
    });
    this.sharedData.feedbackTasksBSubject.subscribe((tasks: Array<any>) => {
      this.feedbackTasks = tasks;
      this.searchTask();
    });
    this.sharedData.doneTasksBSubject.subscribe((tasks: Array<any>) => {
      this.doneTasks = tasks;
      this.searchTask();
    });
  }

  showTaskDetails(task: any) {
    this.managePopupsS.triggerShowTaskDetail(true, task);
  }

  showAddTask(status: string) {
    this.managePopupsS.triggerShowAddTaskDialog(true, status);
  }

  searchTask() {

    for (let tasks of [this.todoTasks, this.progressTasks, this.feedbackTasks, this.doneTasks]) {
      if(tasks){
        tasks.forEach((task) => {
          task.show = (this.searchInput === '') || (task.title.toLowerCase().includes(this.searchInput.toLowerCase()) || task.description.toLowerCase().includes(this.searchInput.toLowerCase()));
        });
      }
    }
  }

  async drop(event: CdkDragDrop<any>){
    const newStatus = event.container.id;
    console.log(newStatus);
    if(newStatus !== event.previousContainer.id){
      this.loadingService.setLoading(true);
      let task = event.item.data;
      const body = {
        "status": newStatus,
        "id": task.id
      }
      await this.dataService.editTask(body);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.loadingService.setLoading(false);
    }
  }
}
