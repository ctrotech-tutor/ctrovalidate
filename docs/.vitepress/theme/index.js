import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { h } from 'vue'

export default {
    extends: DefaultTheme,
    Layout() {
        const { frontmatter } = useData()

        // If no breadcrumb in frontmatter, just render default layout
        if (!frontmatter.value.breadcrumb) return h(DefaultTheme.Layout)

        // Generate JSON-LD for breadcrumbs
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

        // Render layout and inject script slot
        return h(DefaultTheme.Layout, null, {
            'layout-bottom': () =>
                h('script', {
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify(breadcrumbSchema)
                })
        })
    }
}
