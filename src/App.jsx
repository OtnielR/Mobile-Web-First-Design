import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/home/home'
import Settings from './pages/settings/settings'
import ArticleDetails from './pages/article/article-details'
import Bookmarked from './pages/bookmarked/bookmarked'
import Discover from './pages/discover/discover'


function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)


    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)


  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/article/:id" element={<ArticleDetails />}></Route>
          <Route path="/bookmarked" element={<Bookmarked />}></Route>
          <Route path="/discover" element={<Discover />}></Route>
        </Routes>
      </BrowserRouter>

      {!isOnline && (
        <div className="fixed inset-0 z-[9999] bg-white">
          <iframe
            src="./game.html"
            className="w-full h-full border-none"
            title="Offline Game"
          />
        </div>
      )}
    </>
  )
}

export default App
