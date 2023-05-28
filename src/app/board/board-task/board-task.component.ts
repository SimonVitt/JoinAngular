import { Component, Input } from '@angular/core';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss']
})
export class BoardTaskComponent {
  @Input() task!: Task;

  ngOnInit(){
    
  }
}
