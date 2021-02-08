import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PagesToggleService } from '../../services';

declare var pg: any;
@Component({
  selector: 'pangolin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  _headerClass = '';
  isHorizontalLayout: false;
  _service;
  @Input()
  boxed: boolean = false;

  @Input()
  extraClass: string = '';

  constructor(private toggler: PagesToggleService) {}

  ngOnInit() {
    this.isHorizontalLayout = pg.isHorizontalLayout;
    this._service = this.toggler.headerClass.subscribe((state) => {
      this._headerClass = state;
    });
  }

  ngOnDestroy() {
    this._service.unsubscribe();
  }
}
