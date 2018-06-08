import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { AuthorizePage } from "../pages/authorize/authorize";
import { DatabaseProvider } from "../providers/database/database";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = AuthorizePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private databaseProvider: DatabaseProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      databaseProvider.getWeekIdFromDatabase().then(res => {
        console.log("WEEK: " + JSON.stringify(res));
      }).catch(err => {
        console.log("UNABLE TO GET WEEK ID:", err);
        
      })

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
