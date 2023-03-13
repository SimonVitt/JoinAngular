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
}
