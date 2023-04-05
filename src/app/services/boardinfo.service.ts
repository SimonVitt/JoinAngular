import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardinfoService {
  boardIdBSubject = new BehaviorSubject<number>(-1);

  constructor() { }
  
  setCurrentBoard(id: number){
    sessionStorage.setItem('board',`${id}`);
    this.boardIdBSubject.next(id);
  }
}
