import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthFacade } from '../../../core/facades';
import { Observable } from 'rxjs';
import { IUser } from '@pangolin/types';
import { PagesToggleService } from '../../services';
declare var pg: any;
@Component({
  selector: 'appartoo-test-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BaseLayoutComponent implements OnInit {
  _mobileHorizontalMenu: boolean = false;
  currentPangolin$: Observable<IUser>;
  menuItems = [
    {
      label: 'Mes amis',
      routerLink: 'users/friends',
      iconType: 'pg',
      type: '',
    },
    {
      label: 'Inviter un amis',
      routerLink: '/users/invitation',
      iconType: 'pg',
      type: '',
    },
    {
      label: 'Communauté',
      routerLink: '/users/nation',
      iconType: 'pg',
      type: '',
    },
    {
      label: "Demande d'amis",
      routerLink: '/users/friend-requests',
      iconType: 'pg',
      type: '',
    },
  ];

  constructor(
    private authFacade: AuthFacade,
    private toggler: PagesToggleService
  ) {
    this.currentPangolin$ = this.authFacade.currentPango$;
    this.authFacade.loadCurrentPango();
  }

  ngOnInit(): void {
    // this.authFacade.loadCurrentPango();
    this.changeLayout('horizontal-menu');
    this.changeLayout('horizontal-app-menu');
  }

  logout() {
    this.authFacade.logout();
  }

  changeLayout(type: string) {
    pg.addClass(document.body, type);
  }
  removeLayout(type: string) {
    pg.removeClass(document.body, type);
  }
  toggleHorizontalMenuMobile() {
    this._mobileHorizontalMenu = this._mobileHorizontalMenu != true;
    this.toggler.toggleMobileHorizontalMenu(this._mobileHorizontalMenu);
  }

  openSearch($e) {
    $e.preventDefault();
    this.toggler.toggleSearch(true);
  }
}
