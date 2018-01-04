import VueI18n from "vue-i18n";
import Vue from "vue";
import messages from "../../locale/messages";

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    messages, //
});

module.exports = i18n;
