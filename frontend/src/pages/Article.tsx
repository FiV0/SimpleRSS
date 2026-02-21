import { useParams } from "react-router-dom"

export function Article() {
  const { articleId } = useParams()

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Article #{articleId}</h1>
      <p className="text-muted-foreground">Article content will appear here.</p>
    </div>
  )
}
