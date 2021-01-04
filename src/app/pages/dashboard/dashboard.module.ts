import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {MapModule} from '../../ui/map/map.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { IndividualTrafficComponent } from './pages/individual-traffic/individual-traffic.component';
import { PublicTransportComponent } from './pages/public-transport/public-transport.component';
import { BikeTrafficComponent } from './pages/bike-traffic/bike-traffic.component';
import { MicroMobilityComponent } from './pages/micro-mobility/micro-mobility.component';
import { IntermodalTrafficComponent } from './pages/intermodal-traffic/intermodal-traffic.component';


@NgModule({
  declarations: [DashboardComponent, IndividualTrafficComponent, PublicTransportComponent, BikeTrafficComponent, MicroMobilityComponent, IntermodalTrafficComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MapModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule
  ]
})

export class DashboardModule {
}
