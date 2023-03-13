import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { TopperComponent } from './topper/topper.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HelpComponent } from './help/help.component';
import { ContainerboardComponent } from './containerboard/containerboard.component';


@NgModule({
  declarations: [
    NavbarComponent,
    TopperComponent,
    SummaryComponent,
    BoardComponent,
    AddTaskComponent,
    LegalNoticeComponent,
    ContactsComponent,
    HelpComponent,
    ContainerboardComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule
  ]
})
export class BoardModule { }
