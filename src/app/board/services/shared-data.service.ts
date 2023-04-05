import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GetDataService } from 'src/app/services/get-data.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  allTasks: any = [];
  todoTasks: any = [];
  progressTasks: any = [];
  feedbackTasks: any = [];
  doneTasks: any = [];
  categories: any = [];
  users: Array<any> = [];

  allTasksBSubject = new BehaviorSubject<Array<any>>([]);
  todoTasksBSubject = new BehaviorSubject<Array<any>>([]);
  progressTasksBSubject = new BehaviorSubject<Array<any>>([]);
  feedbackTasksBSubject = new BehaviorSubject<Array<any>>([]);
  doneTasksBSubject = new BehaviorSubject<Array<any>>([]);
  categoriesBSubject = new BehaviorSubject<Array<any>>([]);
  usersBSubject = new BehaviorSubject<Array<any>>([]);

  boardname!: string;

  constructor(private dataService: GetDataService, private route: ActivatedRoute) {}

  ngOnInit(){

  }

  async setTasks(){
    this.allTasks = await this.dataService.getTasks();
    this.allTasksBSubject.next(this.allTasks);
    this.todoTasks = this.allTasks.filter((task: any) => {
      return task.status === 'todo';
    });
    this.todoTasksBSubject.next(this.todoTasks);
    this.progressTasks = this.allTasks.filter((task: any) => {
      return task.status === 'progress';
    });
    this.progressTasksBSubject.next(this.progressTasks);
    this.feedbackTasks = this.allTasks.filter((task: any) => {
      return task.status === 'feedback';
    });
    this.feedbackTasksBSubject.next(this.feedbackTasks);
    this.doneTasks = this.allTasks.filter((task: any) => {
      return task.status === 'done';
    });
    this.doneTasksBSubject.next(this.doneTasks);
  }

  async setCategories(){
    this.categories = await this.dataService.getCategories();
    this.categoriesBSubject.next(this.categories);
  }

  async setUsers(){
    this.users = await this.dataService.getUsers() as Array<any>;
    this.usersBSubject.next(this.users);
  }

  setBoardname(boardname: string){
    this.boardname = boardname;
  }


}
