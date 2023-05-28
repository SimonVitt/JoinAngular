import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { EditTask } from '../interfaces/editTask';
import { ResetPasswordBody } from '../interfaces/resetPasswordBody';
import { Task } from '../interfaces/task';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  //BASEURL = 'https://joinbackendanywhere.pythonanywhere.com/';
  BASEURL = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

  getAllBoardsOfUser(){
    return lastValueFrom(this.http.get(this.BASEURL+`api/boards/`));
  }

  getAllUsers(){
    return lastValueFrom(this.http.get(this.BASEURL+`api/users/`));
  }

  getCategories(){
    return lastValueFrom(this.http.get(this.BASEURL+`api/boards/${this.getId()}/categories/`));
  }

  getTasks(){
    return lastValueFrom(this.http.get(this.BASEURL+`api/boards/${this.getId()}/tasks/`));
  }

  getUsers(){
    return lastValueFrom(this.http.get(this.BASEURL+`api/boards/${this.getId()}/users/`));
  }

  createBoard(body: { name: string; board_users: number[]; }){
    return lastValueFrom(this.http.post(this.BASEURL+`api/boards/`, body));
  }

  createTask(body: EditTask){
    return lastValueFrom(this.http.post(this.BASEURL+`api/boards/${this.getId()}/tasks/`, body));
  }

  createCategory(body:{ name: string; color: string; }){
    return lastValueFrom(this.http.post(this.BASEURL+`api/boards/${this.getId()}/categories/`, body))
  }

  sendEmailReset(body: {email: string;}){
    return lastValueFrom(this.http.post(this.BASEURL+`members/sendemail/`, body));
  }

  resetPassword(body: ResetPasswordBody){
    return lastValueFrom(this.http.patch(this.BASEURL+`members/changepassword/`, body));
  }

  deleteTask(id: number){
    return lastValueFrom(this.http.delete(this.BASEURL+`api/boards/${this.getId()}/tasks/${id}/`));
  }

  editTask(body: EditTask){
    const id = body.id;
    delete body.id;
    return lastValueFrom(this.http.patch(this.BASEURL+`api/boards/${this.getId()}/tasks/${id}/`, body));
  }

  editBoard(body: { board_users: number[]; }){
    return lastValueFrom(this.http.patch(this.BASEURL+`api/boards/${this.getId()}/`, body));
  }

  getId(){
    return sessionStorage.getItem('board');
  }
}
