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

  getCategories(boardname:string){
    return lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/${boardname}/categories`));
  }

  getTasks(boardname:string){
    return lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/${boardname}/tasks`));
  }

  getUsers(boardname:string){
    return lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/${boardname}/users`));
  }

  createBoard(body: any){
    return lastValueFrom(this.http.post(`http://127.0.0.1:8000/api/createboard/`, body));
  }

  createTask(body: any, boardname:string){
    return lastValueFrom(this.http.post(`http://127.0.0.1:8000/api/${boardname}/tasks/`, body));
  }

  createCategory(body:any, boardname:string){
    return lastValueFrom(this.http.post(`http://127.0.0.1:8000/api/${boardname}/categories/`, body))
  }

  sendEmailReset(body: any){
    return lastValueFrom(this.http.post(`http://127.0.0.1:8000/members/sendemail/`, body));
  }

  resetPassword(body: any){
    return lastValueFrom(this.http.patch(`http://127.0.0.1:8000/members/changepassword/`, body));
  }

  deleteTask(boardname: string, id: number){
    return lastValueFrom(this.http.delete(`http://127.0.0.1:8000/api/${boardname}/tasks/${id}/`));
  }

  editTask(boardname: string, body: any){
    const id = body.id;
    delete body.id;
    return lastValueFrom(this.http.patch(`http://127.0.0.1:8000/api/${boardname}/tasks/${id}/`, body));
  }
}
