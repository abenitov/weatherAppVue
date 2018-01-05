<template>
    <div>
    <header>
        <nav>
            <router-link class="link" to="/" v-t="'LIT_DASHBOARD'"></router-link> |
            <router-link class="link" to="/currentTemp" v-t="'LIT_CURRENT_TEMP'"></router-link> |
            <router-link class="link" to="/history" v-t="'LIT_RECORDS'"></router-link>
        </nav>
    </header>
    <main>
        <h1 v-t="'LIT_APP_TITLE'"></h1>
        <router-view></router-view>
    </main>
    <footer>
    </footer>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>

    :host {
        display: block;
    }

    .link {

    }

    header {
        background-color: #fff;
        padding: 16px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
    }

    main {
        padding: 1em;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        margin-top: 50px;
        display: block;
    }

    footer {
        text-align: center;
        font-size: 0.8em;
    }

</style>