import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {AppComponent} from './app.component';
import {AuthGuard} from './_guards/auth.guard';
import {ChartsModule} from './ng2-charts';

import {Services} from './_services/array';
import {Componets} from './mainComponets';

@NgModule({
  declarations: [
    AppComponent,
    ...Componets
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    ...Services
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
