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
import { WebdriverService } from "./providers/webdriver.service";
import { ProjectService } from "./providers/project.service";
import { SettingsService } from "./providers/settings.service";

import { WebviewDirective } from "./directives/webview.directive";

import { ActionInfoComponent } from "./components/home/components/action-info/action-info.component";
import { AlexSettingsComponent } from "./components/settings/components/alex-settings/alex-settings.component";
import { AppComponent } from "./app.component";
import { BrowserwindowComponent } from "./components/home/components/browserwindow/browserwindow.component";
import { GeneralSettingsComponent } from "./components/settings/components/general-settings/general-settings.component";
import { HomeComponent } from "./components/home/home.component";
import { RecordSequenceComponent } from "./components/home/components/record-sequence/record-sequence.component";
import { RerecordSequenceComponent } from "./components/home/components/rerecord-sequence/rerecord-sequence.component";
import { SequenceInfoComponent } from "./components/home/components/sequence-info/sequence-info.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { StabilitySettingsComponent } from "./components/settings/components/stability-settings/stability-settings.component";
import { WebdriverSettingsComponent } from "./components/settings/components/webdriver-settings/webdriver-settings.component";

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
  faSync,
  faCamera,
  faPlus,
  faSave,
  faDatabase,
  faTimes,
  faCog,
  faTrash,
  faExclamation,
  faForward,
  faCheck
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
library.add(faCamera);
library.add(faPlus);
library.add(faSave);
library.add(faDatabase);
library.add(faTimes);
library.add(faTrash);
library.add(faCog);
library.add(faExclamation);
library.add(faForward);
library.add(faCheck);

@NgModule({
  declarations: [
    ActionInfoComponent,
    AlexSettingsComponent,
    AppComponent,
    BrowserwindowComponent,
    GeneralSettingsComponent,
    HomeComponent,
    RecordSequenceComponent,
    RerecordSequenceComponent,
    SequenceInfoComponent,
    SettingsComponent,
    StabilitySettingsComponent,
    WebdriverSettingsComponent,
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
  providers: [ElectronService, WebdriverService, ProjectService, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
