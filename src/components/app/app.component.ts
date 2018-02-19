import { Component } from '@angular/core';
import WeatherService from '../../services/WeatherService';
import CityService from '../../services/CityService';
import { Modal } from 'ngx-modialog';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import City from '../../domain/City';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [CityService]
})
export class AppComponent implements OnInit {
  private cities: City[];
  private hot: number;
  private ice: number;

  async ngOnInit() {
    await this.refreshCities();
  }
  
  constructor(private cityService: CityService){
  }

  async dropToDefault(){
    this.cityService.clearToDefault();
    await this.refreshCities();
  }
  
  public async refreshCities(){
    this.cities = await this.cityService.getCities();
    
    this.hot = Math.max(...this.cities.map(city => {
      return city.temperature;
    }));

    this.ice = Math.min(...this.cities.map(city => {
      return city.temperature;
    }));
  }
}


