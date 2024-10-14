import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//in your `main.js` file
import '../node_modules/flowbite-vue/dist/index.css'
import './assets/style.css'
//in your `main.js` file

const app = createApp(App)

app.use(router)

app.mount('#app')
