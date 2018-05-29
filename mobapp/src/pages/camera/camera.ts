import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';




@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodescanner: BarcodeScanner, private qrScanner: QRScanner) {
  }

  scannQr(){
    this.barcodescanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData.text);
      if(barcodeData.format == "QR_CODE"){
        barcodeData.text 
      }
     }).catch(err => {
         console.log('Error', err);
     });
    }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  
}
