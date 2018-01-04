import Vue from 'vue';
import Observable from 'rxjs';

export class weatherService{

    let tempDetailsData;

    let getAllMode = false;


 getWeather = () => {


    const getAll = this.getAllMode;
    let observables = [];

    if (getAll) {
        observables.push(this.http.get(Environment.weatherAPI.url));

    } else {
        Environment.weatherAPI.cities.forEach( city => {
            observables.push(Vue.http.get(Environment.weatherAPI.url + "/" + city).catch((resError) => {
                console.error("Error in service response: " + JSON.stringify(resError));
                const emptyResponse = undefined;
                return Observable.of(emptyResponse);
            }));
        });
    }

    this.tempDetailsData = [];
    Observable.forkJoin(observables).subscribe((responses: Response[]) => {
        for (const response  of responses){
            if (!response) {
                continue;
            }

            if (getAll) {
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

 processAPIResponse = (weatherResponse) => {

    if (weatherResponse instanceof Object && weatherResponse.name !== undefined && weatherResponse.main !== undefined) {
        this.tempDetailsData.push(new TempDetailData(weatherResponse.name, weatherResponse.main));

    } else {
        console.log("Invalid response: " + JSON.stringify(weatherResponse));
    }
}

}