import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"

interface MdxContentProps {
  source: string
}

export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none prose-pre:border prose-pre:border-border/50 prose-pre:bg-muted/20 prose-pre:relative prose-code:text-primary prose-code:before:content-none prose-code:after:content-none prose-a:text-primary prose-a:no-underline prose-a:hover:underline prose-headings:tracking-tight prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h2:border-b prose-h2:border-border/40 prose-h2:pb-2 prose-h2:mt-10 prose-h3:mt-6 prose-p:leading-relaxed prose-li:leading-relaxed prose-strong:text-foreground prose-table:border-collapse prose-th:border prose-th:border-border/50 prose-th:bg-muted/30 prose-th:px-3 prose-th:py-2 prose-td:border prose-td:border-border/50 prose-td:px-3 prose-td:py-2 prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:not-italic">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypePrettyCode,
                {
                  theme: "github-dark",
                  keepBackground: true,
                },
              ],
            ],
          },
        }}
      />
    </div>
  )
}
