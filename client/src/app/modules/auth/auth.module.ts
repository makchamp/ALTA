import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Reactive forms provide a model-driven approach to handling form inputs whose values change over tim
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthTabsComponent } from '../../components/auth-tabs/auth-tabs.component';
import { LoginComponent } from 'src/app/components/login/login.component';

@NgModule({
  declarations: [AuthTabsComponent, LoginComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AuthTabsComponent, LoginComponent],
})
export class AuthModule {}