import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topper',
  templateUrl: './topper.component.html',
  styleUrls: ['./topper.component.scss']
})
export class TopperComponent {
  @Input() boardname!: string;
  showLogout: boolean = false;
  username: string | null;

  constructor(private authService: AuthService, private router: Router){
    this.username = localStorage.getItem('username');
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
