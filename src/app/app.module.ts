import "zone.js/dist/zone-mix";
import "reflect-metadata";
import "../polyfills";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";

// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// Bootstrap
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ElectronService } from "./providers/electron.service";
import { SeleniumService } from "./providers/selenium.service";

import { WebviewDirective } from "./directives/webview.directive";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { BrowserwindowComponent } from "./components/home/components/browserwindow/browserwindow.component";
import { QuickbarComponent } from "./components/home/components/quickbar/quickbar.component";
import { SidebarComponent } from "./components/home/components/sidebar/sidebar.component";
import { StatusbarComponent } from "./components/home/components/statusbar/statusbar.component";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

//Font Awesome
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPause,
  faCircle,
  faSquare,
  faArrowLeft,
  faArrowRight,
  faFastForward,
  faFastBackward,
  faStepForward,
  faStepBackward,
  faSync
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlay);
library.add(faPause);
library.add(faCircle);
library.add(faSquare);
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faSync);
library.add(faFastForward);
library.add(faFastBackward);
library.add(faFastBackward);
library.add(faStepForward);
library.add(faStepBackward);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrowserwindowComponent,
    QuickbarComponent,
    SidebarComponent,
    StatusbarComponent,
    WebviewDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [ElectronService, SeleniumService],
  bootstrap: [AppComponent]
})
export class AppModule {}
