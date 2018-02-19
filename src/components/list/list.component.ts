import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import CityService from '../../services/CityService';
import City from '../../domain/City';
import { Statuses } from '../../domain/Statuses';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
  providers: [CityService]
})
export class ListComponent implements OnChanges{
  private isInitSorted = false;

  @Input() private ice: number;
  @Input() private hot: number;

  @Input() private cities: City[];

  async ngOnInit(){
    await this.sortTemperature();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isInitSorted && changes['cities']) {
      this.sortTemperature();
      this.isInitSorted = true;
    }
  }
  
  constructor(private cityService: CityService) {

  }

  changeStatusMap(name){
    this.changeStatus(name, Statuses.GoingToVisit);
  }

  changeStatusHeart(name){
    this.changeStatus(name, Statuses.Visited);
  }

  private changeStatus(name: string, status: Statuses){
    const city = this.cities.find((el) => name === el.name);
    if (city.status === status){
      this.cityService.setStatus(name, Statuses.Neutral);
      city.status = Statuses.Neutral;
      return;
    }
    this.cityService.setStatus(name, status);
    city.status = status;
  }

  delete(name){
    this.cityService.deleteCity(name);
    this.cities = this.cities.filter(city => city.name !== name);
  }

  sortName(){
    this.cities.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortTemperature(){
    this.cities.sort((a, b) => {
      if (a.temperature < b.temperature) return -1;
      if (a.temperature > b.temperature) return 1;
      return 0;
    });
  }

  sortWeather(){
    this.cities.sort((a, b) => a.weatherIcon.localeCompare(b.weatherIcon));
  }

  sortStatus(){
    this.cities.sort((a, b) => {
      if (a.status < b.status) return 1;
      if (a.status > b.status) return -1;
      return 0;
    }); 
  }
}
