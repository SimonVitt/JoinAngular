import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ManagePopupsService } from '../services/manage-popups.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent {
  @Input() status: string = 'todo';
  previousColor: ElementRef | undefined;
  createCategoryName: string = '';

  categories: Array<any> = [];
  users: Array<any> = [];

  selectedPriority: string | undefined;
  assignedContacts: Array<any> = [];
  dueDate: Date | undefined;
  category: any = 'Select a Category';
  title: string = '';
  description: string = '';

  colorCreateCategory: string | undefined;

  createCategoryB: boolean = false;
  errorCreateCategory: boolean = false;

  showUsers: boolean = false;
  resetAssigned: boolean = false;

  dateError: boolean = false;
  prioError: boolean = false;
  titleError: boolean = false;
  descriptionError: boolean = false;
  categoryError: boolean = false;

  constructor(private managePopups: ManagePopupsService, private sharedData: SharedDataService, private loadingService: LoadingService, private dataService: GetDataService) { }

  ngOnInit() {
    this.sharedData.categoriesBSubject.subscribe((data) => {
      this.categories = data;
    });
    this.sharedData.usersBSubject.subscribe((data) => {
      this.users = data;
      this.users.forEach(user => user.checked = false);
    });
  }

  dismissCategory() {
    this.createCategoryB = false;
  }

  async createCategory() {
    if (this.colorCreateCategory && this.createCategoryName.length > 3) {
      this.loadingService.setLoading(true);
      this.errorCreateCategory = false;
      const newCategory = {
        "name": this.createCategoryName,
        "color": this.colorCreateCategory
      };
      console.log(newCategory);
      this.categories.push(await this.dataService.createCategory(newCategory));
      this.createCategoryName = '';
      this.colorCreateCategory = undefined;
      this.dismissCategory();
      this.loadingService.setLoading(false);
    } else {
      this.errorCreateCategory = true;
    }
  }

  async createTask() {
    this.resetErrors();
    if (this.checkFilledOut()) {
      this.loadingService.setLoading(true);
      const task = {
        "priority": this.selectedPriority,
        "title": this.title,
        "description": this.description,
        "due_date": this.dueDate,
        "status": this.status,
        "category": this.category,
        "assigned_users": this.getAssignedUsers()
      };
      await this.dataService.createTask(task);
      await this.sharedData.setTasks();
      this.loadingService.setLoading(false);
      this.closeCard();
      this.managePopups.triggerTaskAdded();
    }
  }

  checkFilledOut() {
    this.titleError = this.title.length == 0;
    this.descriptionError = this.description.length == 0;
    this.categoryError = this.category === 'Select a Category';
    this.prioError = !this.selectedPriority;
    this.dateError = !this.dueDate;
    return !(this.titleError || this.descriptionError || this.categoryError || this.prioError || this.dateError);
  }

  resetErrors() {
    this.titleError = false;
    this.categoryError = false;
    this.dateError = false;
    this.prioError = false;
    this.descriptionError = false;
  }

  selectedColorCategory(color: string, target: EventTarget | null) {
    this.colorCreateCategory = color;
    let targetEvent = target as EventTarget;
    let targetDiv = targetEvent as HTMLElement;
    const elementRef = new ElementRef(targetDiv);
    elementRef.nativeElement.classList.add('selected-color');
    this.previousColor?.nativeElement.classList.remove('selected-color');
    this.previousColor = elementRef;
  }

  getAssignedUsers() {
    const selectedUsers = this.users.filter(user => user.checked);
    selectedUsers.forEach((user) => {
      this.assignedContacts.push(user.id);
    });
    return this.assignedContacts;
  }

  checkUser(id: number){
    let user = this.users.filter(user => user.id == id);
    user[0].checked = !user[0].checked;
  }

  closeCard() {
    this.clearTask();
    this.managePopups.triggerShowAddTaskDialog(false, 'todo');
  }

  clearTask() {
    this.title = '';
    this.description = '';
    this.category = 'Select a Category';
    this.selectedPriority = undefined;
    this.assignedContacts = [];
    this.dueDate = undefined;
    this.resetAssigned = true;
    setTimeout(() => {
      this.resetAssigned = false;
    }, 10);
  }

}
