<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h4 v-t="'LIT_GET_MODE_LABEL'"></h4>
                <input type="checkbox" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12"><weather-details></weather-details></div>
        </div>
        <div class="row">
            <div class="col-md-12"><weather-records></weather-records></div>
        </div>
    </div>
</template>

<script>
    import WeatherDetails from './weather-details.vue';

    export default {
        components: {WeatherDetails},
        name: "weather-dashboard"
    }
</script>

<style lang="scss" scoped>
    .row{
        margin-top: 50px;
    }

</style>