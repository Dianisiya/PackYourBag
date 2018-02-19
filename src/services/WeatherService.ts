import {Injectable} from '@angular/core';
import Weather from '../domain/Weather';
import { HttpClient } from '@angular/common/http';

@Injectable()
export default class WeatherService {
    private key: string = 'dc190a9f47022fdf0ead666741607ed0';
    constructor(private http: HttpClient) {
        
    }
    
    public getWeather(cities: string[]) : Promise<Weather[]>{
        const newArr = cities.map( city => {
            return this.http.get<Weather>(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.key}&units=metric`).toPromise();
        });
        return Promise.all(newArr);
    }

}