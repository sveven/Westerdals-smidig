import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Toast, ToastController } from "ionic-angular";
import { DatabaseProvider } from "../../providers/database/database";

@IonicPage()
@Component({
  selector: "page-add-recipe",
  templateUrl: "add-recipe.html"
})
export class AddRecipePage {
  private recipe:any = {}
  private portions: number = 0;
  private selectOptions = {
    title: 'Velg antall porsjoner'
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider, 
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter(): void {
    this.recipe = this.navParams.get("recipe");
  }

  private addToDatabase(): void {
    console.log(this.portions);
    this.databaseProvider.tempAddRecipeToDatabase(this.recipe.id, this.portions);
    
    let message = this.recipe.title + " er blitt lagt til i oversikten din!" 
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    }).present();

    this.closeModal();
    
  }

  private closeModal(): void {
    this.navCtrl.pop();
  }
}
