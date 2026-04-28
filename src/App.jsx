import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route } from "react-router-dom"
import Home from './pages/home/home'
import Settings from './pages/settings/settings'
import ArticleDetails from './pages/article/article-details'
import Bookmarked from './pages/bookmarked/bookmarked'
import Discover from './pages/discover/discover'


function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => {
      console.log("MODE OFFLINE")
      setIsOnline(false)

      window.location.href = "game.html"

    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    if (!navigator.onLine) {
      window.location.href = "game.html"
    }


  }, [])

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/article/:id" element={<ArticleDetails />}></Route>
          <Route path="/bookmarked" element={<Bookmarked />}></Route>
          <Route path="/discover" element={<Discover />}></Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
