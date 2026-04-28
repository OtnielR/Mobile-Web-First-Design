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
                        <Link to="/" className="flex flex-col justify-center items-center">
                            <Home size={26} className={`outline-none rounded-lg p-1 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:scale-110 hover:cursor-pointer ${location.pathname == '/' ? "bg-gray-200 dark:bg-slate-600" : ""}`} />

                            <p>Home</p>
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Link to="/discover" className="flex flex-col justify-center items-center">
                            <Search size={26} className={`outline-none rounded-lg p-1 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:scale-110 hover:cursor-pointer ${location.pathname == '/discover' ? "bg-gray-200 dark:bg-slate-600" : ""}`} />
                            <p>Discover</p>
                        </Link>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <Link to="/bookmarked" className="flex flex-col justify-center items-center">
                            <BookMarked size={26} className={`outline-none rounded-lg p-1 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:scale-110 hover:cursor-pointer ${location.pathname == '/bookmarked' ? "bg-gray-200 dark:bg-slate-600" : ""}`} />
                            <p>Bookmarked</p>

                        </Link>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <Link to="/settings" className="flex flex-col justify-center items-center">
                            <Settings size={26} className={`outline-none rounded-lg p-1 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:scale-110 hover:cursor-pointer ${location.pathname == '/settings' ? "bg-gray-200 dark:bg-slate-600" : ""}`} />

                            <p>Settings</p>
                        </Link>

                    </div>

                </div>
            </nav>
        </>
    )
}
