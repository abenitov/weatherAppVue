<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <span v-t="'LIT_TEMP_RECORD_COMPONENT'"></span>
            </div>
        </div>
        <div class="row" v-if="recordWeatherTime">
            <div class="col-md-12"><weather-details :weatherTime="recordWeatherTime"></weather-details></div>
        </div>
        <div class="row recordList" v-for="time in recordsTimes"  v-on:click="sendWeatherTimeToTempComp(time)">
            <div class="col-md-12">
                {{ time}}
            </div>

        </div>
    </div>
</template>

<script>
    import WeatherStore from '../services/weatherStore';

    let recordsTimes = [];
    let recordWeatherTime = undefined;
    export default {
        name: "weather-records",
        created() {
          console.log("weather records created");
          new WeatherStore().getWeatherSubscription().subscribe((currentWeather) => {
              console.log("currentWeather got,"+ JSON.stringify(currentWeather));
              console.log(recordsTimes);
              recordsTimes.push(currentWeather.time);
          });
        },
        data() {
            return {
                recordWeatherTime,
                recordsTimes
            }
        },

        methods: {
            sendWeatherTimeToTempComp(recordWeatherTime) {
                console.log("click on sendWeatherTimeToTempComp");
                this.recordWeatherTime = recordWeatherTime;
            }
        }
    }
</script>

<style scoped>

</style>