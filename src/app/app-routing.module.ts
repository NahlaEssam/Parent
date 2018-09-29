import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { RouterGaurdService } from './shared/services/routerGaurd/router-gaurd.service';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersListComponent ,  canActivate: [RouterGaurdService]},
    { path: 'userInfo/:id', component: UserInfoComponent , canActivate: [RouterGaurdService] },
    { path: 'user', component: UserCreateComponent , canActivate: [RouterGaurdService] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
