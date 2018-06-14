import { Component } from "@angular/core";
import {
  IonicPage,
  AlertController,
  NavController,
  NavParams
} from "ionic-angular";
import { LoginProvider } from "../../providers/login/login";
import { Storage } from "@ionic/storage";
import { DatabaseProvider } from "../../providers/database/database";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  showLogin: boolean = true;
  username: string = "";
  password: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private loginProvider: LoginProvider,
    private databaseProvider: DatabaseProvider,
    private storage: Storage
  ) { }

  ionViewWillEnter() {
    this.storage
      .get("kolonialUserId")
      .then((res: any) => {
        if (res !== null) {
          this.storage.get("weekId").then(res => {
            this.databaseProvider.setWeekId(res);
            this.navCtrl.push("WelcomePage");
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  loginPush() {
    if (this.username === "" || this.password === "") {
      this.presentWrongInfoAlert();
    } else {
      this.loginProvider
        .loginToKolonial(this.username, this.password)
        .then((res: any) => {
          console.log("userinfo", res);
          this.storage.set("kolonialUserId", res.user.id).then(() => {
            this.storage
              .set("username", res.user.first_name +" "+ res.user.last_name)
              .then(() => {
                this.storage.set("location", res.user.zip_place).then(() => {
                  this.databaseProvider
                    .getWeekIdFromServer(res.user.id)
                    .then((res: any) => {
                      this.storage.set("weekId", res);
                      this.navCtrl.push("WelcomePage");
                    })
                    .catch(err => {
                      console.log(err);
                    });
                });
              });
          });
        })
        .catch(err => {
          console.log("Error: ", err);
          this.presentWrongInfoAlert();
        });
    }
  }

  presentWrongInfoAlert() {
    let alert = this.alertCtrl.create({
      title: "Feil brukernavn/passord",
      subTitle: "Skriv inn riktig brukernavn og passord",
      buttons: ["Ok"]
    });
    alert.present();
  }
}
