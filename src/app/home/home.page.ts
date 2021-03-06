import { Component } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isTrackingEnabled = false;
  trackedLocations: Array<any> = [];
  timeTrackerInterval: any;
  config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    interval: 5000,
    notificationTitle: 'Tracking your steps!'
  };

  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode,
    private platform: Platform,
  ) {

    this.initializeApp();

    this.backgroundGeolocation.configure(this.config)
      .then((location: BackgroundGeolocationResponse) => {

        /* this.showNotification(location); */

        /*  this.trackedLocations.push(location); */
        // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
        // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        /*  this.backgroundGeolocation.finish(); // FOR IOS ONLY */

      });


    this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((result) => {
      console.log('location subscription: ', JSON.stringify(result));
      this.showNotification(result);
      this.trackedLocations.push(result);
      console.log('trackedLocations ', this.trackedLocations);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {

      if (!this.backgroundMode.isEnabled()) {
        this.backgroundMode.enable();
        this.timeTracker();
      }

    });
  }

  timeTracker(): void {
    this.timeTrackerInterval = setInterval(() => {
      this.showNotification('test time tracker');
    }, 5000);
  }

  startBackgroundGeolocation() {
    // start recording location
    this.backgroundGeolocation.start();

    this.isTrackingEnabled = true;
  }

  stopBackgroundGeolocation() {
    // If you wish to turn OFF background-tracking, call the #stop method.
    this.backgroundGeolocation.stop();

    this.isTrackingEnabled = false;
  }

  showNotification(data: any) {
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: JSON.stringify(data),
      sound: 'file://sound.mp3',
      data: { secret: 'key' }
    });
  }

}
