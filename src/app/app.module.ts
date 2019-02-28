import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ElectronService } from './providers/electron.service';
import { ProjectService } from './providers/project.service';
import { SettingsService } from './providers/settings.service';

import { ProjectDao } from './dao/project.dao';
import { SettingsDao } from './dao/settings.dao';

import { ActionFactory } from './factory/action.factory';
import { ProjectFactory } from './factory/project.factory';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BrowserWindowComponent } from './components/common/browser-window/browser-window.component';
import { ActionComponent } from './components/home/action/action.component';
import { BrowserComponent } from './components/home/browser/browser.component';
import { BrowserSidebarComponent } from './components/home/browser-sidebar/browser-sidebar.component';
import { EditableActionComponent } from './components/home/editable-action/editable-action.component';
import { EditableHtmlElementActionComponent } from './components/home/editable-html-element-action/editable-html-element-action.component';
import { HtmlElementActionComponent } from './components/home/html-element-action/html-element-action.component';
import { LocatorComponent } from './components/home/locator/locator.component';
import { ProjectComponent } from './components/home/project/project.component';
import { SequenceComponent } from './components/home/sequence/sequence.component';
import { SequenceSidebarComponent } from './components/home/sequence-sidebar/sequence-sidebar.component';
import { RecordComponent } from './components/record/record.component';
import { ReRecordComponent } from './components/re-record/re-record.component';
import { ReRecordSidebarComponent } from './components/re-record/re-record-sidebar/re-record-sidebar.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
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
} from '@fortawesome/free-solid-svg-icons';
import {
  faChrome,
  faFirefox,
  faEdge,
  faInternetExplorer
} from '@fortawesome/free-brands-svg-icons';

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
    AppComponent,
    HomeComponent,
    SettingsComponent,
    WebviewDirective,
    BrowserWindowComponent,
    ActionComponent,
    BrowserComponent,
    BrowserSidebarComponent,
    EditableActionComponent,
    EditableHtmlElementActionComponent,
    HtmlElementActionComponent,
    LocatorComponent,
    ProjectComponent,
    SequenceComponent,
    SequenceSidebarComponent,
    RecordComponent,
    ReRecordComponent,
    ReRecordSidebarComponent
  ],
  entryComponents: [
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
    ElectronService,
    ProjectService,
    SettingsService,
    ProjectDao,
    SettingsDao,
    ActionFactory,
    ProjectFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
