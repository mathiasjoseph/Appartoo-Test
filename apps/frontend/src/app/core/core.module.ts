import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { pangoAuthReducer, pangoUsersReducer } from './reducers';
import { AuthEffects, UsersEffects } from './effects';


export interface AppState {
}

export const reducers: ActionReducerMap<AppState> = {};
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature('pango-auth', pangoAuthReducer),
    StoreModule.forFeature('pango-users', pangoUsersReducer),
    EffectsModule.forRoot([
      AuthEffects,
      UsersEffects
    ])

  ]
})
export class CoreModule {
}
