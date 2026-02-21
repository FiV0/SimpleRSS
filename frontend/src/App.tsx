import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Feeds } from '@/pages/Feeds'
import { Feed } from '@/pages/Feed'
import { Article } from '@/pages/Article'
import { AddFeed } from '@/pages/AddFeed'
import { Settings } from '@/pages/Settings'
import { Login } from '@/pages/Login'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Navbar } from '@/components/Navbar'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/feeds"
            element={
              <ProtectedRoute>
                <Feeds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feeds/:feedId"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/articles/:articleId"
            element={
              <ProtectedRoute>
                <Article />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-feed"
            element={
              <ProtectedRoute>
                <AddFeed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/feeds" replace />} />
          <Route path="*" element={<Navigate to="/feeds" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
