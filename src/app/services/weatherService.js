import Vue from 'vue';
import Rx from 'rxjs/Rx';

import Environment from '../config/Environment';
import WeatherStore from './weatherStore';

export default class WeatherService {

    constructor() {
        console.log("init weatherService");
        this.getAllMode = false;
        this.getWeather();
        this.weatherStore = new WeatherStore();
        setInterval(this.getWeather, Environment.weatherAPI.refreshInterval);
    }

 getWeather() {


    let observables = [];
    if (this.getAllMode) {
        observables.push(Vue.http.get(Environment.weatherAPI.url));

    } else {
        Environment.weatherAPI.cities.forEach( city => {
            observables.push(Rx.Observable.fromPromise(Vue.http.get(Environment.weatherAPI.url + "/" + city)).catch((resError) => {
                console.error("Error in service response: " + JSON.stringify(resError));
                const emptyResponse = undefined;
                return Rx.Observable.of(emptyResponse);
            }));
        });
    }

    this.tempDetailsData = [];
     Rx.Observable.forkJoin(observables).subscribe((responses) => {
         console.log(responses);
         for (const response  of responses){
            console.log(response);
            if (!response) {
                continue;
            }

            if (this.getAllMode) {
                for (const key in response.json()) {
                    this.processAPIResponse(response.json()[key]);
                }
            } else {
                this.processAPIResponse(response.json());
            }


        }
        if (this.tempDetailsData.length > 1) {
            this.weatherStore.saveWeather(this.tempDetailsData);
        }
    }, (resError) => {
        console.log("Error in service response: " + JSON.stringify(resError));
    });

};

 processAPIResponse(weatherResponse)  {

    if (weatherResponse instanceof Object && weatherResponse.name !== undefined && weatherResponse.main !== undefined) {
        this.tempDetailsData.push(weatherResponse);

    } else {
        console.log("Invalid response: " + JSON.stringify(weatherResponse));
    }
}

}