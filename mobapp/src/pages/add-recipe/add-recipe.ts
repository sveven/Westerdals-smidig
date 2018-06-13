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
  private portions: number = 1;
  private day: string = "Monday";
  private type: string = "Breakfast"
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
    if (this.recipe.default_num_portions) {
      this.portions = this.recipe.default_num_portions;
    }
    
  }

  private addToDatabase(): void {
    this.databaseProvider.addRecipeToDatabase(this.recipe.id, this.portions, this.day, this.type);
    
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
