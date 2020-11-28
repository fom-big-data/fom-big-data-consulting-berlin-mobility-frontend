import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FirebaseModule} from './core/firebase/firebase.module';
import {HeaderComponent} from './components/header/header.component';
import {MapboxModule} from './core/mapbox/mapbox.module';
import {EntityModule} from './core/entity/entity.module';
import {LandingOverlayComponent} from './components/landing-overlay/landing-overlay.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MapModule} from './ui/map/map.module';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

    HttpClientModule,

    // UI modules
    MapModule,

    // Core modules
    EntityModule,
    FirebaseModule,
    MapboxModule,

    MatCardModule,

    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
