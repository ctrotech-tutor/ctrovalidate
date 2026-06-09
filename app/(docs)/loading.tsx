export default function DocsLoading() {
  return (
    <div className="flex gap-8 px-4 lg:px-6 py-8 animate-pulse">
      <div className="flex-1 min-w-0 max-w-3xl mx-auto lg:mx-0 space-y-4">
        <div className="h-4 w-48 rounded bg-muted" />
        <div className="h-8 w-96 rounded bg-muted" />
        <div className="h-3 w-32 rounded bg-muted" />
        <div className="space-y-2 mt-8">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
          <div className="h-4 w-4/6 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-3/6 rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}
