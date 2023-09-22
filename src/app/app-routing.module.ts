import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogComponent } from './layout/log/log.component';
import { DefaultComponent } from './layout/default/default.component';
import { AuthGuard } from './shared/auth.guard';
import { VerifyMailComponent } from './verify-mail/verify-mail.component';
import { EmployeesComponent } from './employees/employees.component';


const routes: Routes = [
  {
    path: '',
    component: LogComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  {
    path: '',
    component: DefaultComponent,
    canActivate:[AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      {path: 'verify-email', component : VerifyMailComponent},
      { path: 'user/:id', component: UserDetailComponent },
      { path: 'employees', component: EmployeesComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
