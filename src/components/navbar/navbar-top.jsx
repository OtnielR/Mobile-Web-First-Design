import { BookOpen, Menu, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function NavbarTop() {
    const navigate = useNavigate()

    return (
        <>
            <nav className="bg-white dark:bg-slate-900 w-full fixed top-0 h-16 shadow-md dark:shadow-slate-800 z-80">
                <div className="w-full h-16 flex justify-between items-center px-6">
                    <div className="flex justify-center items-center gap-3">
                        <BookOpen size={28} className="text-blue-500" />

                        <p className="text-slate-900 dark:text-slate-100 text-xl ">Article.id</p>

                    </div>
                    <div className="">
                        <button onClick={() => navigate(-1)} className="outline-none rounded-xl p-2 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-slate-700 hover:cursor-pointer text-slate-900 dark:text-slate-100" aria-label="back">
                            <ArrowLeft />
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}
