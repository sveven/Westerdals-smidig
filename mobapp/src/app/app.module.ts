import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthorizePage } from '../pages/authorize/authorize';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

import { WelcomePage } from '../pages/welcome/welcome';
import { BottomTabPage } from '../pages/bottom-tab/bottom-tab';
import { CameraPage } from '../pages/camera/camera';
import { SearchPage } from '../pages/search/search';
import { CheckoutPage } from '../pages/checkout/checkout';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthorizePage,
   

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthorizePage,
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    QRScanner,
    

  ]
})

export class AppModule {}
