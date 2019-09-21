import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChrome, faEdge, faFirefox, faInternetExplorer } from '@fortawesome/free-brands-svg-icons';
import {
  faCaretDown,
  faCheck,
  faCircle,
  faCog,
  faEdit,
  faEye,
  faFile,
  faFileExport,
  faFolderOpen,
  faPlay, faPlus,
  faSave,
  faTimes,
  faToggleOn,
  faArrowLeft,
  faArrowRight,
  faSquare,
  faSync,
  faExclamationTriangle,
  faTrash,
  faStream,
  faFlask,
  faCaretRight,
  faCube,
  faCubes,
  faAdjust
} from '@fortawesome/free-solid-svg-icons';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// NG Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import 'reflect-metadata';
import 'zone.js/dist/zone-mix';
import '../polyfills';

import { AppComponent } from './app.component';
import { BrowserWindowComponent } from './components/common/browser-window/browser-window.component';
import { StatusbarComponent } from './components/common/statusbar/statusbar.component';
import { ActionTestResultComponent } from './components/home/action-test-result/action-test-result.component';
import { ActionComponent } from './components/home/action/action.component';
import { BrowserTestResultComponent } from './components/home/browser-test-result/browser-test-result.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectTestResultComponent } from './components/home/project-test-result/project-test-result.component';
import { SequenceTestResultComponent } from './components/home/sequence-test-result/sequence-test-result.component';
import { SequenceComponent } from './components/home/sequence/sequence.component';
import { ReRecordComponent } from './components/re-record/re-record.component';
import { RecordComponent } from './components/record/record.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditableInputComponent } from './components/common/editable-input/editable-input.component';
import { GeneralSettingsComponent } from './components/settings/general-settings/general-settings.component';
import { WebdriverSettingsComponent } from './components/settings/webdriver-settings/webdriver-settings.component';

import { WebviewDirective } from './directives/webview.directive';

import { ActionFactory } from './factory/action.factory';
import { BoundingBoxFactory } from './factory/bounding-box.factory';
import { BrowserFactory } from './factory/browser.factory';
import { LocatorFactory } from './factory/locator.factory';
import { ProjectFactory } from './factory/project.factory';
import { SettingsFactory } from './factory/settings.factory';

import { ElectronService } from './providers/electron.service';
import { ProjectService } from './providers/project.service';
import { ReplayService } from './providers/replay.service';
import { SettingsService } from './providers/settings.service';
import { RecordedSequencesComponent } from './components/home/recorded-sequences/recorded-sequences.component';
import { TestResultsComponent } from './components/home/test-results/test-results.component';
import { StatusBadgeComponent } from './components/common/status-badge/status-badge.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


library.add(faCog,
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
  faCaretDown,
  faCaretRight,
  faFile,
  faArrowLeft,
  faArrowRight,
  faSquare,
  faSync,
  faExclamationTriangle,
  faTrash,
  faFlask,
  faStream,
  faCube,
  faCubes,
  faAdjust
);
library.add(faChrome, faFirefox, faEdge, faInternetExplorer);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    WebviewDirective,
    BrowserWindowComponent,
    ActionComponent,
    SequenceComponent,
    RecordComponent,
    ReRecordComponent,
    StatusbarComponent,
    ProjectTestResultComponent,
    SequenceTestResultComponent,
    BrowserTestResultComponent,
    ActionTestResultComponent,
    EditableInputComponent,
    GeneralSettingsComponent,
    WebdriverSettingsComponent,
    RecordedSequencesComponent,
    TestResultsComponent,
    StatusBadgeComponent
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    ElectronService,
    ProjectService,
    ReplayService,
    SettingsService,
    ActionFactory,
    BoundingBoxFactory,
    BrowserFactory,
    LocatorFactory,
    ProjectFactory,
    SettingsFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
