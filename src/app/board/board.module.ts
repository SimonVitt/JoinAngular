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
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { BoardTaskComponent } from './board-task/board-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { FormsModule } from '@angular/forms';
import { TaskAddedSuccessPopupComponent } from './task-added-success-popup/task-added-success-popup.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SinglecontactComponent } from './singlecontact/singlecontact.component';
import { AddContactComponent } from './add-contact/add-contact.component';


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
    ContainerboardComponent,
    AddTaskDialogComponent,
    BoardTaskComponent,
    TaskDetailComponent,
    EditTaskComponent,
    TaskAddedSuccessPopupComponent,
    SinglecontactComponent,
    AddContactComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    FormsModule,
    DragDropModule
  ]
})
export class BoardModule { }
