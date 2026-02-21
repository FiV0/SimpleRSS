import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { useNavigate } from "react-router-dom"

interface ArticleCardProps {
  id: number
  title: string
  publishedAt: string | null
  isRead: boolean
}

export function ArticleCard({ id, title, publishedAt, isRead }: ArticleCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      className={`cursor-pointer hover:bg-accent transition-colors ${isRead ? 'opacity-60' : ''}`}
      onClick={() => navigate(`/articles/${id}`)}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          {!isRead && <Badge variant="default" className="text-xs">New</Badge>}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        {publishedAt && (
          <CardDescription>
            {formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  )
}
