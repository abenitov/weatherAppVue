<template>
    <div class="container" id="tempDetailsContainer">
        <div class="row">
            <div class="col-md-12">
                <span v-t="'LIT_TEMP_DETAIL_TITLE'"></span>
            </div>
            <div id="tempDetails" class="col-md-12" v-if="weatherDetails">
                <span>{{weatherDetails.time}}</span>
            </div>
        </div>
        <div class="row" v-for="weatherDetail in weatherDetails">
            <div class="row">

                <div class="col-md-12">{{weatherDetail.city}}</div>
            </div>
            <div class="row">
                <div class="col-md-4">temp: {{weatherDetail.data.temp}}</div>
                <div class="col-md-4">temp_min: {{weatherDetail.data.temp_min}}</div>
                <div class="col-md-4">temp_max: {{weatherDetail.data.temp_max}}</div>


            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: "weather-details",
        data() {
           return {
               weatherDetails: undefined
           }

        }
    }
</script>

<style lang="scss" scoped>

    * {
        color: white;
    }

    #tempDetailsContainer {
        background-color: white;
        border-radius: 3px;

    }

    .row {
        background-color: grey;
        border-radius: 3px;
        border-width: 1px;
        border-color: #c4c4c4;
        border-style: solid;
        margin:5px;
    }

</style>