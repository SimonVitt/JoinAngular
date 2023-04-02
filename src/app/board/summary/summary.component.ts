import { Component, Input } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  tasksNumber: number = 0;
  tasksProgressNumber: number = 0;
  tasksFeedbackNumber: number = 0;
  tasksTodoNumber: number = 0;
  tasksDoneNumber: number = 0;
  urgentTodoNumber: number = 0;

  upcomingDeadline: string = 'None';

  boardname!: string;
  username: string | null;

  constructor(private sharedData: SharedDataService) {
    this.boardname = this.sharedData.boardname;
    this.username = localStorage.getItem('username');
  }

  ngOnInit() {
    this.getAllTasks();

  }

  getAllTasks() {
    this.sharedData.allTasksBSubject.subscribe((tasks: Array<any>) => {
      this.setDataFromAllTasks(tasks);
    });
    this.sharedData.progressTasksBSubject.subscribe((tasks: Array<any>) => {
      this.tasksProgressNumber = tasks.length;
    });
    this.sharedData.feedbackTasksBSubject.subscribe((tasks: Array<any>) => {
      this.tasksFeedbackNumber = tasks.length;
    });
    this.sharedData.todoTasksBSubject.subscribe((tasks: Array<any>) => {
      this.tasksTodoNumber = tasks.length;
    });
    this.sharedData.doneTasksBSubject.subscribe((tasks: Array<any>) => {
      this.tasksDoneNumber = tasks.length;
    });
  }

  setDataFromAllTasks(tasks: Array<any>) {
    this.tasksNumber = tasks.length;
    const uTasks = tasks.filter((task: any) => {
      return task.priority === 'urgent';
    });
    this.urgentTodoNumber = uTasks.length;
    const dTasks = tasks.sort((a, b) => {
      const dateA = new Date(a.due_date);
      const dateB = new Date(b.due_date);
      return dateA.getTime() - dateB.getTime();
    });
    if (dTasks.length > 0) {
      const dateParts = dTasks[0].due_date.split("-");
      this.upcomingDeadline = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
    }
  }
}
