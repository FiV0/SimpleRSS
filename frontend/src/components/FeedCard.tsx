import { Rss } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

interface FeedCardProps {
  id: number
  title: string
  url: string
  siteUrl: string | null
  unreadCount: number
}

export function FeedCard({ id, title, url, siteUrl, unreadCount }: FeedCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      className="cursor-pointer hover:bg-accent transition-colors"
      onClick={() => navigate(`/feeds/${id}`)}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <Rss className="size-5 text-orange-500 shrink-0" />
        <div className="flex-1 min-w-0">
          <CardTitle className="text-base truncate">{title}</CardTitle>
          <CardDescription className="truncate">{siteUrl || url}</CardDescription>
        </div>
        {unreadCount > 0 && (
          <span className="text-xs font-medium bg-primary text-primary-foreground rounded-full px-2 py-0.5">
            {unreadCount}
          </span>
        )}
      </CardHeader>
    </Card>
  )
}
