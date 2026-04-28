import { Home, Search, BookMarked, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

export default function NavbarBottom() {
    const location = useLocation()

    return (
        <>
            <nav className="bg-white dark:bg-slate-900 w-full fixed bottom-0 h-16 z-80">
                <div className="w-full h-16 grid grid-cols-4 items-center px-2 text-slate-900 dark:text-slate-100 text-xs">
                    <div className="flex flex-col justify-center items-center">
                        <Link to="/" className={`outline-none rounded-lg p-1 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:scale-110 hover:cursor-pointer ${location.pathname == '/' ? "bg-gray-200 dark:bg-slate-600" : ""}`}>
                            <Home size={20} />
                        </Link>
                        <p>Home</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Link to="/discover" className={`outline-none rounded-lg p-1 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:scale-110 hover:cursor-pointer ${location.pathname == '/discover' ? "bg-gray-200 dark:bg-slate-600" : ""}`}>
                            <Search size={20} />
                        </Link>
                        <p>Discover</p>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <Link to="/bookmarked" className={`outline-none rounded-lg p-1 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:scale-110 hover:cursor-pointer ${location.pathname == '/bookmarked' ? "bg-gray-200 dark:bg-slate-600" : ""}`}>
                            <BookMarked size={20} />
                        </Link>
                        <p>Bookmarked</p>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <Link to="/settings" className={`outline-none rounded-lg p-1 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:scale-110 hover:cursor-pointer ${location.pathname == '/settings' ? "bg-gray-200 dark:bg-slate-600" : ""}`}>
                            <Settings size={20} />
                        </Link>

                        <p>Settings</p>
                    </div>

                </div>
            </nav>
        </>
    )
}
