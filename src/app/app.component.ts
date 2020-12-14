import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse,BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import {Observable, Subscription} from 'rxjs';
// import { Subscription } from "rxjs";

declare var window;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  arr:any;
  newtime = 0;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backgroundGeolocation: BackgroundGeolocation,
    private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode,
    // private backgroundMode: BackgroundMode
  ) {
    this.initializeApp();
  //   Observable.interval(1000).subscribe(()=>{
  //     this.Capturelocation();
  // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backgroundMode.enable();
       
      setTimeout(() => {
        console.log('ssssssssssssssssssssssss');
         this.Capturelocation();
       }, 1000);
      this.backgroundMode.on('activate').subscribe(() => {
         console.log('dfjkdhfjdfd');
      //  this.Capturelocation();
       
    });
    window.app = this;
      
    });
  }
  
  Capturelocation() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };
    this.backgroundGeolocation.configure(config).then(() => {
      setInterval(() => {
        this.backgroundGeolocation.on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);
          this.showNotification(location)
          // this.sendGPS(location);

          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        });
       }, 1000);
      
    });
    
    // this.backgroundGeolocation.configure(config).then(() =>{
    //   console.log(config);
    //   this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location:BackgroundGeolocationResponse) => {
    //     let locationstr = localStorage.getItem('location');
    //     if (locationstr == null) {
    //       this.arr.push(locationstr);            
    //     } else {
    //       let locationarr = JSON.parse(locationstr);      
    //       this.arr =  locationstr  ;
    //     }
    //     localStorage.setItem('location', JSON.stringify(this.arr));
    //   });
    // })
    window.app = this;
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
}
