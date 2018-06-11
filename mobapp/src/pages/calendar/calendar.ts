import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
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
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private databaseProvider: DatabaseProvider
  ) {
    this.getAllWeeks();
    console.log(this.weeks);
    
  }

  getAllWeeks() {
    this.storage.get("kolonialUserId").then(res => {
      this.databaseProvider
        .getAllWeeksFromServer(res)
        .then((plannerUsers: any) => {
          console.log("users", plannerUsers);
          this.weeks = [];
          for (let user of plannerUsers) {
            for (let week of user.Weeks) {
              let newWeek = {
                id: week.id,
                name: week.name
              };
              if (name === null) {
                newWeek.name = "Hektisk Uke";
              }
              this.weeks.push(newWeek);
            }
          }
        });
    });
  }

}
