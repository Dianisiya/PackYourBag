import { Injectable } from "@angular/core";
import City from '../domain/City';
import WeatherService from '../services/WeatherService';
import listCities from '../assets/cities';
import { Statuses } from "../domain/Statuses";

@Injectable()
export default class CityService{
    private key = 'cities';
    constructor(private weatherService: WeatherService){

    }

    public clearToDefault(){
        localStorage.removeItem(this.key);
        localStorage.setItem(this.key, JSON.stringify(listCities.map( name => {
            return new City(name);
        })));
    }

    public async getCities(): Promise<City[]>{
        const cities = JSON.parse(localStorage.getItem(this.key)) as City[];
        const weather = await this.weatherService.getWeather(cities.map(city =>{
            return city.name;
        }));
        cities.forEach(el => {
            const weatherForCity = weather.find(w =>{
                return w.name === el.name;
            })
            el.weather = weatherForCity.weather[0].description;
            el.temperature = weatherForCity.main.temp;
            el.weatherIcon = weatherForCity.weather[0].icon;
        });

        return cities;
    }

    public addCity(name: string){
        const cities = JSON.parse(localStorage.getItem(this.key)) as City[];
        cities.push(new City(name));
        localStorage.setItem(this.key, JSON.stringify(cities));
    }

    public deleteCity(name: string){
        let cities = JSON.parse(localStorage.getItem(this.key)) as City[];
        cities = cities.filter(el => name !== el.name);
        localStorage.setItem(this.key, JSON.stringify(cities));
    }

    public setStatus(name: string, status: Statuses){
        const cities = JSON.parse(localStorage.getItem(this.key)) as City[];
        cities.find(el => name === el.name).status = status;
        localStorage.setItem(this.key, JSON.stringify(cities)); 
    }

    
}