import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PangolinNationComponent } from './components/pangolin-nation/pangolin-nation.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { FriendRequestsComponent } from './components/friend-requests/friend-requests.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { FriendsComponent } from './components/friends/friends.component';

const routes: Routes = [
  {
    path: 'nation',
    component: PangolinNationComponent,
  },
  {
    path: 'invitation',
    component: InvitationComponent,
  },
  {
    path: 'friend-requests',
    component: FriendRequestsComponent,
  },
  {
    path: 'friends',
    component: FriendsComponent,
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
