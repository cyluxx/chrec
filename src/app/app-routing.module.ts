import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { ReRecordComponent } from './components/re-record/re-record.component';
import { RecordComponent } from './components/record/record.component';

const routes: Routes = [
    {
        path: 're-record',
        component: ReRecordComponent
    },
    {
        path: 'record',
        component: RecordComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
