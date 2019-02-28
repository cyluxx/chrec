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
import { ProjectComponent } from './components/home/project/project.component';
import { SequenceComponent } from './components/home/sequence/sequence.component';
import { RecordComponent } from './components/record/record.component';
import { ReRecordComponent } from './components/re-record/re-record.component';
import { StatusbarComponent } from './components/common/statusbar/statusbar.component';
import { ProjectTestResultComponent } from './components/home/project-test-result/project-test-result.component';
import { SequenceTestResultComponent } from './components/home/sequence-test-result/sequence-test-result.component';
import { BrowserTestResultComponent } from './components/home/browser-test-result/browser-test-result.component';
import { ActionTestResultComponent } from './components/home/action-test-result/action-test-result.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCog,
  faSave,
  faFileExport,
  faFolderOpen,
  faPlus,
  faCircle,
  faCheck,
  faTimes,
  faPlay,
  faToggleOn,
  faEye,
  faEdit,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import {
  faChrome,
  faFirefox,
  faEdge,
  faInternetExplorer
} from '@fortawesome/free-brands-svg-icons';

library.add(faCog, faSave, faFileExport, faFolderOpen, faPlus, faCircle, faCheck, faTimes, faPlay, faToggleOn, faEye, faEdit, faCaretDown);
library.add(faChrome, faFirefox, faEdge, faInternetExplorer);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    WebviewDirective,
    BrowserWindowComponent,
    ActionComponent,
    ProjectComponent,
    SequenceComponent,
    RecordComponent,
    ReRecordComponent,
    StatusbarComponent,
    ProjectTestResultComponent,
    SequenceTestResultComponent,
    BrowserTestResultComponent,
    ActionTestResultComponent
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
