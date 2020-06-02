import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Start } from '../pages/start/start';
import { Einkaufsliste } from '../pages/einkaufsliste/einkaufsliste';
import { Rezepte } from '../pages/rezepte/rezepte';
import { Produktsuche } from '../pages/produktsuche/produktsuche';
import { Einstellungen } from '../pages/einstellungen/einstellungen';
import { Rezeptansicht } from  '../pages/rezeptansicht/rezeptansicht';
import { Gekauft } from '../pages/gekauft/gekauft';

@NgModule({
  declarations: [
    MyApp,
    Start,
    Einkaufsliste,
    Rezepte,
    Produktsuche,
    Einstellungen,
    Rezeptansicht,
    Gekauft
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Start,
    Einkaufsliste,
    Rezepte,
    Produktsuche,
    Einstellungen,
    Rezeptansicht,
    Gekauft
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
