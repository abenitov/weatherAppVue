import Rx from 'rxjs/Rx';

let instance = null;

export default class WeatherStore {



     constructor(){
         if(!instance){
             console.log("init weatherStore");
             this.newWeather = new Rx.Subject();
             this.weatherMap = new Map();
             this.currentWeather = undefined;
             instance = this;
         }

         return instance;
     }


     getWeatherByTime(time) {
        return this.weatherMap.get(time);

    }

     saveWeather(weather) {

        const time = new Date();
        weather["time"] = time.getTime().toString();
        this.currentWeather = weather;
        console.log("saving weather," + JSON.stringify(weather));
        this.weatherMap.set(time.getTime().toString(), weather);
        this.newWeather.next(this.currentWeather);
    }

     getWeatherMap() {

        return this.weatherMap;
    }

     getCurrentWeather() {
        return this.currentWeather;
    }

     getWeatherSubscription() {
        return this.newWeather.asObservable();
    }

}
