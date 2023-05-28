import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Task } from 'src/app/interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class ManagePopupsService {
  showTaskDetailS  = new Subject<boolean>();
  showAddTaskDialogS = new BehaviorSubject<[boolean, string]>([false, 'todo']);
  openedTask = new BehaviorSubject<Task | null>(null);
  taskAddedSubject = new Subject<boolean>();
  editTaskSubject = new Subject<boolean>();
  editTaskBSubject = new BehaviorSubject<Task | null>(null);
  addContactSubject = new Subject<boolean>();


  constructor() {}

  triggerShowTaskDetail(show: boolean, task: Task | null){
    this.showTaskDetailS.next(show);
    if(task){
      this.openedTask.next(task);
    }
  }

  triggerShowAddTaskDialog(show: boolean, status: string){
    this.showAddTaskDialogS.next([show, status]);
  }

  triggerTaskAdded(){
    this.taskAddedSubject.next(true);
    setTimeout(() => {
      this.taskAddedSubject.next(false);
    }, 2000);
  }

  triggerEditTask(show: boolean, task: Task | null){
    this.editTaskSubject.next(show);
    if(task){
      this.editTaskBSubject.next(task);
    }
  }

  triggerAddUser(show: boolean){
    this.addContactSubject.next(show);
  }
  
}
