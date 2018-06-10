import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  App
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { DatabaseProvider } from "../../providers/database/database";
import { AuthorizePage } from "../authorize/authorize";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private alertCtrl: AlertController,
    private appCtrl: App
  ) {}

  logOut() {
    this.storage.set("kolonialUserId", null).then(() => {
      this.storage.set("weekId", null).then(() => {
        this.appCtrl.getRootNav().setRoot(AuthorizePage);
        // this.navCtrl.popTo( this.navCtrl.getByIndex(1));
      });
    });
  }

  presentLogoutAlert() {
    let alert = this.alertCtrl.create({
      title: "Logg ut",
      subTitle: "Er du sikker på at du vil logge ut?",
      buttons: [
        {
          text: "Avbryt",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Ok",
          handler: () => {
            this.logOut();
          }
        }
      ]
    });
    alert.present();
  }
}
