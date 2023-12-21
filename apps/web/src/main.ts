import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from 'primevue/config';
import "@/assets/scss/main.scss";

import router from "@/router";
import App from "@/App.vue";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(PrimeVue);
app.mount("#app");
