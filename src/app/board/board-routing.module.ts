import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { BoardComponent } from './board/board.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HelpComponent } from './help/help.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { SummaryComponent } from './summary/summary.component';



const routes: Routes = [
  { path: 'summary', component: SummaryComponent, pathMatch: 'full' },
  { path: 'board', component: BoardComponent, pathMatch: 'full' },
  { path: 'addtask', component: AddTaskComponent, pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent, pathMatch: 'full' },
  { path: 'help', component: LegalNoticeComponent, pathMatch: 'full' },
  { path: 'legalnotice', component: HelpComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'summary', pathMatch: 'full' },
  { path: '**', redirectTo: 'summary', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
