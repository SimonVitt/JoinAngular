import { Component, Input } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import { Task } from 'src/app/interfaces/task';
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
    this.sharedData.allTasksBSubject.subscribe((tasks: Array<Task>) => {
      this.setDataFromAllTasks(tasks);
    });
    this.sharedData.progressTasksBSubject.subscribe((tasks: Array<Task>) => {
      this.tasksProgressNumber = tasks.length;
    });
    this.sharedData.feedbackTasksBSubject.subscribe((tasks: Array<Task>) => {
      this.tasksFeedbackNumber = tasks.length;
    });
    this.sharedData.todoTasksBSubject.subscribe((tasks: Array<Task>) => {
      this.tasksTodoNumber = tasks.length;
    });
    this.sharedData.doneTasksBSubject.subscribe((tasks: Array<Task>) => {
      this.tasksDoneNumber = tasks.length;
    });
  }

  setDataFromAllTasks(tasks: Array<Task>) {
    this.tasksNumber = tasks.length;
    const uTasks = tasks.filter((task: Task) => {
      return task.priority === 'urgent';
    });
    this.urgentTodoNumber = uTasks.length;
    const dTasks: Task[] = tasks.sort((a, b) => {
      const dateA = new Date(a.due_date);
      const dateB = new Date(b.due_date);
      return dateA.getTime() - dateB.getTime();
    });
    if (dTasks.length > 0 && typeof dTasks[0].due_date === 'string') {
      const nearestDay = dTasks[0].due_date as string;
      const dateParts = nearestDay.split("-");
      this.upcomingDeadline = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
    }
  }
}
