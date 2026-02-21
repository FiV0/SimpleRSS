import { useEffect, useState } from "react"
import { Rss, LogOut, Settings, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import supabase from "@/supabase"
import type { User } from "@supabase/supabase-js"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }
    getSession()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate('/feeds')}
            className="flex items-center gap-2 font-medium hover:opacity-80 transition-opacity"
          >
            <Rss className="size-6 text-orange-500" />
            <span className="text-lg font-semibold">SimpleRSS</span>
          </button>
          <NavigationMenu className="z-[9999]">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={() => navigate('/feeds')}
                >
                  My Feeds
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={() => navigate('/add-feed')}
                >
                  <PlusCircle className="size-4 mr-1" />
                  Add Feed
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {!loading && user && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/settings')} className="flex items-center gap-2">
              <Settings className="size-4" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="size-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
