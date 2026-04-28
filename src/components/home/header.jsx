import { useState, useEffect } from "react"
import { getArticle } from "../../services/article"
import { getImageUrl } from "../../api/image"
import Loading from "../shared-component/loading"
import { useNavigate, Link } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate()
    const [popularArticle, setPopularArticle] = useState()

    async function fetchData() {
        const articleResponse = await getArticle()

        console.log(articleResponse)

        setPopularArticle(articleResponse.data[0])
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <header className="w-full dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-1">
                {popularArticle ?
                    <Link to={`/article/${popularArticle.id}`} className="shrink-0 w-full h-52 relative cursor-pointer overflow-hidden" >
                        <div className="absolute top-0 left-0 w-full h-52 bg-black/50 text-slate-100 px-4 py-4 flex flex-col gap-1 justify-end items-start">
                            <div>
                                <h1 className="text-2xl font-bold line-clamp-2">{popularArticle.title}</h1>
                            </div>
                            <div>
                                <p className="text-xs line-clamp-3">{popularArticle.content}</p>
                            </div>
                        </div>
                        <img loading="lazy" className="w-full h-52 object-center object-cover" src={getImageUrl(popularArticle.image_url)} alt="" />
                    </Link>
                    : <Loading />
                }
            </header>
        </>
    )
}
