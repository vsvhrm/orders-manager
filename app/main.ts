import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// prettier-ignore
createApp(App)
  .use(createPinia())
  .use(router)
  .mount(document.body);
