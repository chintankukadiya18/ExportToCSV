import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {File} from '@ionic-native/file';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import { FileTransfer } from '@ionic-native/file-transfer';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ExportDataProvider} from '../providers/export-data/export-data';

@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
      FileTransfer,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        ExportDataProvider,
        File,
        InAppBrowser
    ]
})
export class AppModule {
}
