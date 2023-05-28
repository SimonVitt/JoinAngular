import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { Task } from 'src/app/interfaces/task';
import { User } from 'src/app/interfaces/user';
import { GetDataService } from 'src/app/services/get-data.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  allTasks: Task[] = [];
  todoTasks: Task[] = [];
  progressTasks: Task[] = [];
  feedbackTasks: Task[] = [];
  doneTasks: Task[] = [];
  categories: Category[] = [];
  users: Array<User> = [];

  allTasksBSubject = new BehaviorSubject<Array<Task>>([]);
  todoTasksBSubject = new BehaviorSubject<Array<Task>>([]);
  progressTasksBSubject = new BehaviorSubject<Array<Task>>([]);
  feedbackTasksBSubject = new BehaviorSubject<Array<Task>>([]);
  doneTasksBSubject = new BehaviorSubject<Array<Task>>([]);
  categoriesBSubject = new BehaviorSubject<Array<Category>>([]);
  usersBSubject = new BehaviorSubject<Array<User>>([]);

  boardname!: string;

  constructor(private dataService: GetDataService, private route: ActivatedRoute) {}

  ngOnInit(){

  }

  async setTasks(){
    this.allTasks = await this.dataService.getTasks() as Task[];
    this.allTasksBSubject.next(this.allTasks);
    this.todoTasks = this.allTasks.filter((task: Task) => {
      return task.status === 'todo';
    });
    this.todoTasksBSubject.next(this.todoTasks);
    this.progressTasks = this.allTasks.filter((task: Task) => {
      return task.status === 'progress';
    });
    this.progressTasksBSubject.next(this.progressTasks);
    this.feedbackTasks = this.allTasks.filter((task: Task) => {
      return task.status === 'feedback';
    });
    this.feedbackTasksBSubject.next(this.feedbackTasks);
    this.doneTasks = this.allTasks.filter((task: Task) => {
      return task.status === 'done';
    });
    this.doneTasksBSubject.next(this.doneTasks);
  }

  async setCategories(){
    this.categories = await this.dataService.getCategories() as Category[];
    this.categoriesBSubject.next(this.categories);
  }

  async setUsers(){
    this.users = await this.dataService.getUsers() as Array<User>;
    this.usersBSubject.next(this.users);
  }

  setBoardname(boardname: string){
    this.boardname = boardname;
  }


}
