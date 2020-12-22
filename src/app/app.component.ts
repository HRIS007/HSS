import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse, BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Observable, Subscription } from 'rxjs';

declare var window;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  arr: any;
  newtime = 0;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backgroundGeolocation: BackgroundGeolocation,
    private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
