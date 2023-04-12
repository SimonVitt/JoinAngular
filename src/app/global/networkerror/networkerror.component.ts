import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-networkerror',
  templateUrl: './networkerror.component.html',
  styleUrls: ['./networkerror.component.scss']
})
export class NetworkerrorComponent {

  @Input() status!: string;
  @Output() closeNetwork = new EventEmitter();

  constructor(private authService: AuthService, private loadingService: LoadingService){}
  
  closeNetworkalert(){
    this.closeNetwork.emit();
    this.loadingService.setLoading(false);
    this.returnToLogin();

  }

  returnToLogin(){
    this.authService.logout();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
