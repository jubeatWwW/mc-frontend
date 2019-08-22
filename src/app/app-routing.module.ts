import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DatasetVisComponent } from './components/dataset-vis/dataset-vis.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'db',
        component: DatasetVisComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
