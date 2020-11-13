import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {FirebaseModule} from './core/firebase/firebase.module';
import {MapComponent} from './components/map/map.component';
import {StoryComponent} from './components/story/story.component';
import {TextComponent} from './components/text/text.component';
import {PlaceholderComponent} from './components/placeholder/placeholder.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {MapboxModule} from './core/mapbox/mapbox.module';
import {EntityModule} from './core/entity/entity.module';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    StoryComponent,
    TextComponent,
    PlaceholderComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

    EntityModule,
    FirebaseModule,
    MapboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
