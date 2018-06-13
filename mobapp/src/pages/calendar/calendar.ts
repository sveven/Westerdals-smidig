import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController
} from "ionic-angular";
import { DatabaseProvider } from "../../providers/database/database";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-calendar",
  templateUrl: "calendar.html"
})
export class CalendarPage {
  weeks = [];
  weekName: string = "";
  selected: number = -1;
  newName: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private databaseProvider: DatabaseProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    this.getAllWeeks();
    this.selected = this.databaseProvider.getWeekId();
  }

  getAllWeeks() {
    this.storage.get("kolonialUserId").then(res => {
      this.databaseProvider.getAllWeeksFromServer(res).then((result: any) => {
        this.weeks = [];
        for (let user of result.plannerUsers) {
          for (let week of user.Weeks) {
            let newWeek = {
              id: week.id,
              name: week.name
            };

            if (week.name === null) {
              newWeek.name = "Hektisk Uke";
            }
            this.weeks.push(newWeek);
          }
        }
      });
    });
  }

  changeSelectedWeek() {
    console.log(this.selected);

    this.databaseProvider.setWeekId(this.selected);
    let weekName = "";
    for (let week of this.weeks) {

      if (week.id == this.selected) {
        weekName = week.name;
      }
    }
    this.presentToastMessage("Endret til uke " + weekName);
  }

  changeNameOfWeek() {
    if (this.newName !== "") {
      this.databaseProvider.changeNameOfWeek(this.selected, this.newName);
      this.presentToastMessage("Endret navn på uken til " + this.newName + "!");
      this.getAllWeeks();
      this.newName = "";
    } else {
      let alert = this.alertCtrl.create({
        title: "Oops!",
        subTitle: "Skriv inn et navn hvis du vil bytte.",
        buttons: ["Ok"]
      });
      alert.present();
    }
  }

  presentToastMessage(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000,
        position: "top"
      })
      .present();
  }
}
