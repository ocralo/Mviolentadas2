import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { AlertController } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { CallNumber } from "@ionic-native/call-number/ngx";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from './user.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    AngularFireModule,
    AngularFireAuth,
    AlertController,
    GooglePlus,
    AngularFireDatabase,
    InAppBrowser,
    UserService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
