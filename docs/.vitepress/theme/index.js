import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Breadcrumbs from './components/Breadcrumbs.vue'

export default {
    extends: DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'doc-before': () => h(Breadcrumbs)
        })
    }
}
