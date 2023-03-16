import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-networkerror',
  templateUrl: './networkerror.component.html',
  styleUrls: ['./networkerror.component.scss']
})
export class NetworkerrorComponent {

  @Input() status!: string;
  @Output() closeNetwork = new EventEmitter();

  constructor(private authService: AuthService){}
  
  closeNetworkalert(){
    this.closeNetwork.emit();
  }

  returnToLogin(){
    this.authService.logout();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
