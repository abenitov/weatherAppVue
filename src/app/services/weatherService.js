import Vue from 'vue';
import Rx from 'rxjs/Rx';

import Environment from '../config/Environment';
import WeatherStore from './weatherStore';

export default class WeatherService {

    constructor() {
        console.log("init weatherService");
        this.getAllMode = false;
        this.getWeather();
        setInterval(this.getWeather, Environment.weatherAPI.refreshInterval);
    }

 getWeather =() => {


    let observables = [];
    if (this.getAllMode) {
        observables.push(Vue.http.get(Environment.weatherAPI.url));

    } else {
        Environment.weatherAPI.cities.forEach( city => {
            var params = {
                q: city,
                appid: Environment.weatherAPI.appid
            }
            observables.push(Rx.Observable.fromPromise(Vue.http.get(Environment.weatherAPI.url, {params})).catch((resError) => {
                console.error("Error in service response: " + JSON.stringify(resError));
                const emptyResponse = undefined;
                return Rx.Observable.of(emptyResponse);
            }));
        });
    }

    this.tempDetailsData = [];
     Rx.Observable.forkJoin(observables).subscribe((responses) => {
         for (const response  of responses){
            if (!response) {
                continue;
            }

            if (this.getAllMode) {
                for (const key in response.json()) {
                    this.processAPIResponse(response.body[key]);
                }
            } else {
                this.processAPIResponse(response.body);
            }


        }
        if (this.tempDetailsData.length >= 1) {
            new WeatherStore().saveWeather(this.tempDetailsData);
        }
    }, (resError) => {
        console.log("Error in service response: " + JSON.stringify(resError));
    });

};

 processAPIResponse = (weatherResponse) => {

    if (weatherResponse instanceof Object && weatherResponse.name !== undefined && weatherResponse.main !== undefined) {
        this.tempDetailsData.push({
            city: weatherResponse.name,
            data: weatherResponse.main
        });

    } else {
        console.log("Invalid response: " + JSON.stringify(weatherResponse));
    }
}

}