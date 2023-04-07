import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  BASEURL = 'https://joinbackendanywhere.pythonanywhere.com/';

  constructor(private http: HttpClient) { }

  getAllBoardsOfUser(){
    return lastValueFrom(this.http.get(this.BASEURL+`api/boards/`));
  }

  getAllUsers(){
    return lastValueFrom(this.http.get(this.BASEURL+`api/alluser/`));
  }

  getCategories(){
    return lastValueFrom(this.http.get(this.BASEURL+`api/${this.getId()}/categories/`));
  }

  getTasks(){
    return lastValueFrom(this.http.get(this.BASEURL+`api/${this.getId()}/tasks/`));
  }

  getUsers(){
    return lastValueFrom(this.http.get(this.BASEURL+`api/${this.getId()}/users/`));
  }

  createBoard(body: any){
    return lastValueFrom(this.http.post(this.BASEURL+`api/createboard/`, body));
  }

  createTask(body: any){
    return lastValueFrom(this.http.post(this.BASEURL+`api/${this.getId()}/tasks/`, body));
  }

  createCategory(body:any){
    return lastValueFrom(this.http.post(this.BASEURL+`api/${this.getId()}/categories/`, body))
  }

  sendEmailReset(body: any){
    return lastValueFrom(this.http.post(this.BASEURL+`members/sendemail/`, body));
  }

  resetPassword(body: any){
    return lastValueFrom(this.http.patch(this.BASEURL+`members/changepassword/`, body));
  }

  deleteTask(id: number){
    return lastValueFrom(this.http.delete(this.BASEURL+`api/${this.getId()}/tasks/${id}/`));
  }

  editTask(body: any){
    const id = body.id;
    delete body.id;
    return lastValueFrom(this.http.patch(this.BASEURL+`api/${this.getId()}/tasks/${id}/`, body));
  }

  editBoard(body: any){
    return lastValueFrom(this.http.patch(this.BASEURL+`api/createboard/${this.getId()}/`, body));
  }

  getId(){
    return sessionStorage.getItem('board');
  }
}
