import { useParams } from "react-router-dom"

export function Feed() {
  const { feedId } = useParams()

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Feed #{feedId}</h1>
      <p className="text-muted-foreground">Articles will appear here.</p>
    </div>
  )
}
