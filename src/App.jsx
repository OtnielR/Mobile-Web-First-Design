import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/home/home'
import Settings from './pages/settings/settings'
import ArticleDetails from './pages/article/article-details'
import Bookmarked from './pages/bookmarked/bookmarked'
import Discover from './pages/discover/discover'


function App() {

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
    </>
  )
}

export default App
