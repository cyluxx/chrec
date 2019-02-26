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

import { AlexExportService } from "./providers/alex-export.service";
import { ElectronService } from "./providers/electron.service";
import { WebdriverService } from "./providers/webdriver.service";
import { ProjectService } from "./providers/project.service";
import { SettingsService } from "./providers/settings.service";

import { AlexExportDao } from "./dao/alex-export.dao";
import { ProjectDao } from "./dao/project.dao";
import { SettingsDao } from "./dao/settings.dao";

import { ActionFactory } from "./factory/action.factory";
import { AlexExportFactory } from "./factory/alex-export.factory";
import { SelectorFactory } from "./factory/locator.factory";
import { BrowserFactory } from "./factory/browser.factory";
import { SequenceFactory } from "./factory/sequence.factory";
import { ProjectFactory } from "./factory/project.factory";
import { TestFactory } from "./factory/test.factory";

import { WebviewDirective } from "./directives/webview.directive";

import { ActionInfoComponent } from "./components/home/components/action-info/action-info.component";
import { AlexSettingsComponent } from "./components/settings/components/alex-settings/alex-settings.component";
import { AppComponent } from "./app.component";
import { BrowserInfoComponent } from "./components/home/components/browser-info/browser-info.component";
import { BrowserwindowComponent } from "./components/home/components/browserwindow/browserwindow.component";
import { GeneralSettingsComponent } from "./components/settings/components/general-settings/general-settings.component";
import { HomeComponent, ExportToAlexModal } from "./components/home/home.component";
import { RecordSequenceComponent } from "./components/home/components/record-sequence/record-sequence.component";
import { RerecordSequenceComponent } from "./components/home/components/rerecord-sequence/rerecord-sequence.component";
import { SequenceInfoComponent, ReplayErrorModal } from "./components/home/components/sequence-info/sequence-info.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { StabilitySettingsComponent } from "./components/settings/components/stability-settings/stability-settings.component";
import { WebdriverSettingsComponent } from "./components/settings/components/webdriver-settings/webdriver-settings.component";
import { TestInfoComponent } from "./components/home/components/test-info/test-info.component";

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
  faCheck,
  faPen,
  faFileExport,
  faClock,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import {
  faChrome,
  faFirefox,
  faEdge,
  faInternetExplorer
} from "@fortawesome/free-brands-svg-icons";

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
library.add(faPen);
library.add(faChrome);
library.add(faFirefox);
library.add(faEdge);
library.add(faInternetExplorer);
library.add(faFileExport);
library.add(faClock);
library.add(faInfoCircle);

@NgModule({
  declarations: [
    ActionInfoComponent,
    AlexSettingsComponent,
    AppComponent,
    BrowserInfoComponent,
    BrowserwindowComponent,
    GeneralSettingsComponent,
    HomeComponent,
    RecordSequenceComponent,
    RerecordSequenceComponent,
    SequenceInfoComponent,
    SettingsComponent,
    StabilitySettingsComponent,
    TestInfoComponent,
    WebdriverSettingsComponent,
    WebviewDirective,

    ExportToAlexModal,
    ReplayErrorModal
  ],
  entryComponents: [
    ExportToAlexModal,
    ReplayErrorModal
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
  providers: [
    AlexExportService,
    ElectronService,
    ProjectService,
    SettingsService,
    WebdriverService,
    AlexExportDao,
    ProjectDao,
    SettingsDao,
    ActionFactory,
    AlexExportFactory,
    BrowserFactory,
    ProjectFactory,
    SelectorFactory,
    SequenceFactory,
    TestFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
