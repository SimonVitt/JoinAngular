import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagePopupsService {
  showTaskDetailS  = new Subject<boolean>();
  showAddTaskDialogS = new BehaviorSubject<[boolean, string]>([false, 'todo']);
  openedTask = new BehaviorSubject<any>(null);
  taskAddedSubject = new Subject<boolean>();
  editTaskSubject = new Subject<boolean>();
  editTaskBSubject = new BehaviorSubject<any>(null);
  addContactSubject = new Subject<boolean>();


  constructor() {}

  triggerShowTaskDetail(show: boolean, task: any){
    this.showTaskDetailS.next(show);
    this.openedTask.next(task);
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

  triggerEditTask(show: boolean, task: any){
    this.editTaskSubject.next(show);
    this.editTaskBSubject.next(task);
  }

  triggerAddUser(show: boolean){
    this.addContactSubject.next(show);
  }
  
}
