import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';

const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

import { AdminComponent } from './admin';

import { ListComponent } from './users/list.component';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'users',
        //component: ListComponent,
        loadChildren: usersModule,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }