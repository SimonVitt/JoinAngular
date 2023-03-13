import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllboardspageComponent } from './allboards/allboardspage/allboardspage.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginpageComponent } from './login/loginpage/loginpage.component';
import { PasswordComponent } from './login/password/password.component';
import { SignuppageComponent } from './login/signuppage/signuppage.component';
import { AddTaskComponent } from './board/add-task/add-task.component';
import { BoardComponent } from './board/board/board.component';
import { ContactsComponent } from './board/contacts/contacts.component';
import { ContainerboardComponent } from './board/containerboard/containerboard.component';
import { HelpComponent } from './board/help/help.component';
import { LegalNoticeComponent } from './board/legal-notice/legal-notice.component';
import { SummaryComponent } from './board/summary/summary.component';

const routes: Routes = [
  { path: 'login', component: LoginpageComponent, pathMatch: 'full' },
  { path: 'signup', component: SignuppageComponent, pathMatch: 'full' },
  { path: 'forgotpassword', component: PasswordComponent, pathMatch: 'full' },
  { path: 'yourboards', component: AllboardspageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  {
    path: 'board/:boardname', component: ContainerboardComponent, canActivate: [AuthGuard], children: [
      { path: 'summary', component: SummaryComponent, pathMatch: 'full' },
      { path: 'board', component: BoardComponent, pathMatch: 'full' },
      { path: 'addtask', component: AddTaskComponent, pathMatch: 'full' },
      { path: 'contacts', component: ContactsComponent, pathMatch: 'full' },
      { path: 'help', component: LegalNoticeComponent, pathMatch: 'full' },
      { path: 'legalnotice', component: HelpComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: '**', redirectTo: 'summary', pathMatch: 'full' }]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
