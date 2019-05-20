import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title:'Denuncias',
      url: '/denuncias',
      icon: 'alert'
    },
    {
      title: 'Especialistas',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Información',
      url: '/info',
      icon: 'information'
    },
    {
      title:'Salir',
      url:'/login',
      icon:'log-in'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  backButtonEvent(){
    this.platform.backButton.subscribe(()=>{ });
  }
}
