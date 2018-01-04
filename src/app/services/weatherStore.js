import Rx from 'rxjs/Rx';
export default class WeatherStore {


    constructor() {


        this.currentWeather;
        this.weatherMap = new Map();
        this.newWeather = new Rx.Subject();
    }

    getWeatherByTime(time) {
        return this.weatherMap.get(time);

    }

    saveWeather(weather) {

        const time = new Date();
        weather["time"] = time.getTime().toString();
        this.currentWeather = weather;
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
