<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <span v-t="'LIT_TEMP_RECORD_COMPONENT'"></span>
            </div>
        </div>
        <div class="row" v-if="recordWeatherTime">
            <div class="col-md-12"><temp-details [weatherTime]="recordWeatherTime"></temp-details></div>
        </div>
        <div class="row recordList" v-for="time in recordsTimes">
            <div class="col-md-12">
                {{ time}}
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "weather-records",
        data() {
            return {
                recordWeatherTime: undefined,
                recordsTimes: undefined,
                time: undefined
            }
        }
    }
</script>

<style scoped>

</style>