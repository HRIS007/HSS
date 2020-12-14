import { Component } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse,BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NavController } from '@ionic/angular';

declare var window;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  location: any;
  config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
  };
  constructor(
    public navCtrl: NavController,
    private backgroundGeolocation: BackgroundGeolocation,
    private localNotifications: LocalNotifications
  ) {
   
    this.location = [];
  }
  showNotification(data){
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: JSON.stringify(data),
      sound: 'file://sound.mp3',
      data: { secret: "key" }
    });
  }
  StartBackroundTracking() {
    window.app.backgroundGeolocation.start();
  }
  StopBackroundTracking() {
    window.app.backgroundGeolocation.stop();
  }
  GetGeoLocation() {
   this.location = (JSON.parse(localStorage.getItem('location'))== null)?[]:JSON.parse(localStorage.getItem('location'))
   console.log("this.location")
  }
  Clearlocation() {
    localStorage.removeItem('location');
  }
  startBackgroundGeolocation() {
    // start recording location
    this.backgroundGeolocation.start();
  }

  stopBackgroundGeolocation() {
    // If you wish to turn OFF background-tracking, call the #stop method.
    this.backgroundGeolocation.stop();
  }



}
