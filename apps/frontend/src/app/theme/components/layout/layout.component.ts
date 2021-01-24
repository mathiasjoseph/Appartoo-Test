import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../../../core/facades';
import { Observable } from 'rxjs';
import { User } from '../../../core/models';

@Component({
  selector: 'appartoo-test-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  currentPangolin$: Observable<User>;

  constructor(private authFacade: AuthFacade) {
    this.currentPangolin$ = this.authFacade.currentPango$;
  }

  ngOnInit(): void {
    this.authFacade.loadCurrentPango();
  }

  logout() {
    this.authFacade.logout();
  }
}
