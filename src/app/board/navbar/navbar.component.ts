import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() boardname!: string;

  currentSection: string = 'summary';

  changeSection(section: string){
    this.currentSection = section;
  }
}
