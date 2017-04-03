import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {AppComponent} from './app.component';
import { AuthGuard } from './_guards/auth.guard';

import services from './_services/array';
import mainComponets from './mainComponets';
import { ChartsModule } from './ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ...mainComponets
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
    ...services
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
