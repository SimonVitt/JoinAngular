import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllboardspageComponent } from './allboardspage/allboardspage.component';
import { AddboarddialogComponent } from './addboarddialog/addboarddialog.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AllboardspageComponent,
    AddboarddialogComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ]
})
export class AllboardsModule { }
