import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  getAllBoardsOfUser(){
    return lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/boards`));
  }

  getAllUsers(){
    return lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/alluser`));
  }

  getCategories(){
    return lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/${this.getId()}/categories`));
  }

  getTasks(){
    return lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/${this.getId()}/tasks`));
  }

  getUsers(){
    return lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/${this.getId()}/users`));
  }

  createBoard(body: any){
    return lastValueFrom(this.http.post(`http://127.0.0.1:8000/api/createboard/`, body));
  }

  createTask(body: any){
    return lastValueFrom(this.http.post(`http://127.0.0.1:8000/api/${this.getId()}/tasks/`, body));
  }

  createCategory(body:any){
    return lastValueFrom(this.http.post(`http://127.0.0.1:8000/api/${this.getId()}/categories/`, body))
  }

  sendEmailReset(body: any){
    return lastValueFrom(this.http.post(`http://127.0.0.1:8000/members/sendemail/`, body));
  }

  resetPassword(body: any){
    return lastValueFrom(this.http.patch(`http://127.0.0.1:8000/members/changepassword/`, body));
  }

  deleteTask(id: number){
    return lastValueFrom(this.http.delete(`http://127.0.0.1:8000/api/${this.getId()}/tasks/${id}/`));
  }

  editTask(body: any){
    const id = body.id;
    delete body.id;
    return lastValueFrom(this.http.patch(`http://127.0.0.1:8000/api/${this.getId()}/tasks/${id}/`, body));
  }

  editBoard(body: any){
    return lastValueFrom(this.http.patch(`http://127.0.0.1:8000/api/createboard/${this.getId()}/`, body));
  }

  getId(){
    return sessionStorage.getItem('board');
  }
}
