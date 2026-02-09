import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { h } from 'vue'
import AnnouncementBar from './components/AnnouncementBar.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'

export default {
    extends: DefaultTheme,
    Layout() {
        const { frontmatter } = useData()

        const slots = {
            'layout-top': () => h(AnnouncementBar),
            'doc-before': () => h(Breadcrumbs)
        }

        // If breadcrumbs exist, inject them in layout-bottom
        if (frontmatter.value.breadcrumb) {
            const breadcrumbSchema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": frontmatter.value.breadcrumb.map((item, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": item.name,
                    "item": item.url
                }))
            }
            slots['layout-bottom'] = () => h('script', {
                type: 'application/ld+json',
                innerHTML: JSON.stringify(breadcrumbSchema)
            })
        }

        return h(DefaultTheme.Layout, null, slots)
    }
}
