import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import {
  BarcodeScanner,
  BarcodeScannerOptions
} from "@ionic-native/barcode-scanner";
import { SearchProvider } from "../../providers/search/search";
import { AddRecipePage } from "../add-recipe/add-recipe";

@IonicPage()
@Component({
  selector: "page-camera",
  templateUrl: "camera.html"
})
export class CameraPage {
  recipes: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodescanner: BarcodeScanner,
    private searchProvider: SearchProvider,
    private modalCtrl: ModalController
  ) {}

  scanQr() {
    this.barcodescanner
      .scan()
      .then(barcodeData => {
        if (barcodeData.format == "QR_CODE") {
          this.getRecipeByQr(barcodeData.text);
        }
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  getRecipeByQr(recipeId: string) {
    this.searchProvider
      .getRecipeById(recipeId)
      .then((res: any) => {
        this.openModalForRecipe(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  openModalForRecipe(recipe) {
    this.modalCtrl
      .create(AddRecipePage, {
        recipe: recipe
      })
      .present();
  }
}
