import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllboardspageComponent } from './allboards/allboardspage/allboardspage.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginpageComponent } from './login/loginpage/loginpage.component';
import { PasswordComponent } from './login/password/password.component';
import { SignuppageComponent } from './login/signuppage/signuppage.component';
import { ContainerboardComponent } from './board/containerboard/containerboard.component';
import { ResetpasswordComponent } from './login/resetpassword/resetpassword.component';

const routes: Routes = [
  { path: 'login', component: LoginpageComponent, pathMatch: 'full' },
  { path: 'signup', component: SignuppageComponent, pathMatch: 'full' },
  { path: 'forgotpassword', component: PasswordComponent, pathMatch: 'full' },
  { path: 'resetpassword/:token', component:ResetpasswordComponent, pathMatch:'full'},
  { path: 'yourboards', component: AllboardspageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'board/:boardname', component: ContainerboardComponent, canActivate: [AuthGuard], loadChildren: () => import('./board/board.module').then(m => m.BoardModule)},
  { path: '', redirectTo: 'yourboards', pathMatch: 'full' },
  { path: '**', redirectTo: 'yourboards', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
