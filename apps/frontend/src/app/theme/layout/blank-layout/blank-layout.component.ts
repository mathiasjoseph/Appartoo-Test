import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthFacade } from '../../../core/facades';
import { Observable } from 'rxjs';
import { IUser } from '@pangolin/types';
declare var pg: any;
@Component({
  selector: 'appartoo-test-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlankLayoutComponent implements OnInit {
  currentPangolin$: Observable<IUser>;

  constructor(private authFacade: AuthFacade) {
    this.currentPangolin$ = this.authFacade.currentPango$;
  }

  ngOnInit(): void {
    this.removeLayout('horizontal-menu');
    this.removeLayout('horizontal-app-menu');
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
}
