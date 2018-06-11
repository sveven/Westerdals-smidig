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
  private username: string = "";
  private location: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private alertCtrl: AlertController,
    private appCtrl: App
  ) {
    storage.get("username").then((res:any) => {
      this.username = res;
    })
    storage.get("location").then((res:any) => {
      this.location = res;
    })
  }

  logOut() {
    this.storage.clear().then(() => {
      this.appCtrl.getRootNav().setRoot(AuthorizePage);
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
