import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {IndividualTrafficComponent} from './pages/individual-traffic/individual-traffic.component';
import {PublicTransportComponent} from './pages/public-transport/public-transport.component';
import {BikeTrafficComponent} from './pages/bike-traffic/bike-traffic.component';
import {MicroMobilityComponent} from './pages/micro-mobility/micro-mobility.component';
import {IntermodalTrafficComponent} from './pages/intermodal-traffic/intermodal-traffic.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: 'individual-traffic', component: IndividualTrafficComponent},
      {path: 'public-transport', component: PublicTransportComponent},
      {path: 'bike-traffic', component: BikeTrafficComponent},
      {path: 'micro-mobility', component: MicroMobilityComponent},
      {path: 'intermodal-traffic', component: IntermodalTrafficComponent},
      {path: '', redirectTo: 'individual-traffic', pathMatch: 'full'},
      {path: '**', redirectTo: 'individual-traffic'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
