import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Storage } from "@ionic/storage";

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
    private storage: Storage,
    private databaseProvider: DatabaseProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //TODO: set root to tabs if logged in
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}
