/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import roteador from './routes'

const app = createApp(App)

registerPlugins(app)

app.use(roteador)
app.mount('#app')
