import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationComponent } from './components/invitation/invitation.component';
import { UsersRoutingModule } from './users-routing.module';
import { PangolinNationComponent } from './components/pangolin-nation/pangolin-nation.component';
import { SharedModule } from '../shared/shared.module';
import { FriendRequestsComponent } from './components/friend-requests/friend-requests.component';
import { ThemeModule } from '../theme/theme.module';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { FriendsComponent } from './components/friends/friends.component';

@NgModule({
  declarations: [
    InvitationComponent,
    PangolinNationComponent,
    FriendRequestsComponent,
    UpdateProfileComponent,
    FriendsComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, SharedModule, ThemeModule],
})
export class UsersModule {}
