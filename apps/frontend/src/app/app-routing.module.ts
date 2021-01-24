import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './theme/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { InverseAuthGuard } from './core/guards/inverse-auth.guard';

export const appRouteList: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [InverseAuthGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule)
      }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRouteList)]
})
export class AppRoutingModule {
}
