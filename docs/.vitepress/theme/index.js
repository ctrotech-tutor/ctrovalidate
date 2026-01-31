// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

export default {
    extends: DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            // Inject GTM noscript in the layout-top slot (renders right after <body> starts)
            'layout-top': () => h('noscript', {
                innerHTML: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KC6DGMLR" height="0" width="0" style="display:none;visibility:hidden"></iframe>'
            })
        })
    }
}
