import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { PagesToggleService } from './services/toggler.service';
import { HorizontalMenuComponent } from './layout/horizontal-menu/horizontal-menu.component';
import { SharedModule } from '../shared/shared.module';
import { SearchOverlayComponent } from './layout/search-overlay/search-overlay.component';
import { ContainerComponent } from './components/container/container.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    BlankLayoutComponent,
    HeaderComponent,
    HorizontalMenuComponent,
    SearchOverlayComponent,
    ContainerComponent,
  ],
  exports: [BaseLayoutComponent, BlankLayoutComponent, ContainerComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  providers: [PagesToggleService],
})
export class ThemeModule {}
