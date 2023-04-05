import { Component, ElementRef, Input } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ManagePopupsService } from '../services/manage-popups.service';
import { SharedDataService } from '../services/shared-data.service';
import { EditTask } from 'src/app/interfaces/editTask';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  task: any;
  originalTask: any;
  createCategoryName: string = '';

  categories: Array<any> = [];
  users: Array<any> = [];

  assignedContacts: Array<any> = [];

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

  subToEditTask : Subscription | undefined;

  constructor(private managePopups: ManagePopupsService, private sharedData: SharedDataService, private loadingService: LoadingService, private dataService: GetDataService) { }

  ngOnInit() {
    this.subToEditTask =  this.managePopups.editTaskBSubject.subscribe((task) => {
      this.task = Object.assign({}, task);
      this.task.category = this.task.category.id;
      this.originalTask = task;
      this.task.assigned_users = [];
    });
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
      const editedFields = this.setEditedFields();
      if (Object.keys(editedFields).length > 1) {
        await this.createTaskRequest(editedFields);
      }
      this.closeCardEdit();
    }
  }

  async createTaskRequest(editedFields: EditTask) {
    this.loadingService.setLoading(true);
    this.task.category = this.task.category.id
    await this.dataService.editTask(editedFields).then(async (response) => {
      this.managePopups.triggerShowTaskDetail(true, response)
    });
    await this.sharedData.setTasks();
    this.loadingService.setLoading(false);
  }

  checkFilledOut() {
    this.titleError = this.task.title.length == 0;
    this.descriptionError = this.task.description.length == 0;
    this.categoryError = this.task.category === 'Select a Category';
    this.prioError = !this.task.priority;
    this.dateError = !this.task.due_date;
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
  }

  getAssignedUsers() {
    const selectedUsers = this.users.filter(user => user.checked);
    selectedUsers.forEach((user) => {
      this.assignedContacts.push(user.id);
    });
    return this.assignedContacts;
  }

  checkUser(id: number) {
    let user = this.users.filter(user => user.id == id);
    user[0].checked = !user[0].checked;
  }

  closeCardEdit() {
    this.subToEditTask?.unsubscribe();
    this.managePopups.triggerEditTask(false, null);
  }

  setEditedFields() {
    let editedFields: EditTask = {
      "id": this.originalTask.id
    };
    this.task.assigned_users = this.getAssignedUsers();
    if (!(this.task.assigned_users.length == this.originalTask.assigned_users.length && 
      this.task.assigned_users.every((id:number) => this.originalTask.assigned_users.some((user:any) => user.id === id)))) {
      editedFields.assigned_users = this.task.assigned_users;
    }
    if (this.task.category != this.originalTask.category.id) {
      editedFields.category = this.categories.filter((category) => {
        return category.id ==  +this.task.category;
      });
      editedFields.category = editedFields.category[0];
    }
    if(this.task.status != this.originalTask.status){
      editedFields.status = this.task.status;
    }
    if(this.task.priority != this.originalTask.priority){
      editedFields.priority = this.task.priority;
    }
    if(this.task.title != this.originalTask.title){
      editedFields.title = this.task.title;
    }
    if(this.task.description != this.originalTask.description){
      editedFields.description = this.task.description;
    }
    if(this.task.due_date != this.originalTask.due_date){
      editedFields.due_date = this.task.due_date;
    }
    return editedFields;
  }

  clearTask() {
    this.task.title = '';
    this.task.description = '';
    this.task.category = 'Select a Category';
    this.task.priority = undefined;
    this.assignedContacts = [];
    this.task.due_date = undefined;
    this.resetAssigned = true;
    setTimeout(() => {
      this.resetAssigned = false;
    }, 10);
  }
}
