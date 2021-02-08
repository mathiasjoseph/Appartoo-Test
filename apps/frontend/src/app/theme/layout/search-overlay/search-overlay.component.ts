import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  ElementRef,
  Input,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { fadeAnimation } from '../../animations/fade-animations';
import { SearchResult } from './search-result';
import { PagesToggleService } from '../../services';
import { UsersFacade } from '../../../core/facades';
import { IUser } from '@pangolin/types';
@Component({
  selector: 'app-search-overlay',
  templateUrl: './search-overlay.component.html',
  animations: [fadeAnimation],
  styleUrls: ['./search-overlay.component.scss'],
})
export class SearchOverlayComponent implements OnDestroy {
  @ViewChild('searchField', { static: false }) searchField: ElementRef;
  toggleSubscription: Subscription;
  _isEnabled: boolean = false;
  isVisible: boolean = false;
  value: string = '';
  users: Observable<IUser[]>;

  constructor(
    private el: ElementRef,
    private toggler: PagesToggleService,
    private usersFacade: UsersFacade
  ) {
    this.users = this.usersFacade.searchResult$;
    this.toggleSubscription = this.toggler.searchToggle.subscribe(
      (toggleValue) => {
        this.open();
      }
    );
  }
  ngOnDestroy() {
    this.toggleSubscription.unsubscribe();
  }

  @Input() set isEnabled(isEnabled: boolean) {
    this.isEnabled = isEnabled;
  }
  get isEnabled() {
    return this._isEnabled;
  }

  close($event) {
    $event.preventDefault();
    this.isVisible = false;
    this.value = '';
  }

  open() {
    this.isVisible = true;
    this.value = '';
    setTimeout(() => {
      this.searchField.nativeElement.focus();
    }, 200);
  }

  searchKeyPress(event) {
    this.usersFacade.searchUser(this.value);
  }

  fadeInComplete() {}
}
