import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getArticle } from "../../services/article"
import { getImageUrl } from "../../api/image"
import Loading from "../shared-component/loading"

export default function ContentRecommendation() {

    const navigate = useNavigate()
    const [recommendedArticle, setRecommendedArticle] = useState()
    const categoryId = localStorage.getItem("categoryId")

    async function fetchData() {
        console.log(categoryId)
        const articleResponse = await getArticle(1, 5, null, null, categoryId)

        console.log(articleResponse)

        setRecommendedArticle(articleResponse.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <header className="w-full dark:bg-slate-900 text-slate-900 dark:text-slate-100  py-6 flex flex-col gap-3">

                {recommendedArticle ?
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col  px-3 ">
                            <h1 className="text-lg text-slate-900 dark:text-slate-100 font-bold">Recommend Article</h1>
                            <p className="text-sm text-slate-900 dark:text-slate-100 ">This article who your may like</p>
                        </div>
                        <div className="w-full  relative overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar">

                            <div className="w-7xl grid grid-flow-cols auto-cols-[80%] grid-cols-5 gap-6 px-4 no-scrollbar">
                                {
                                    recommendedArticle.map((article, i) => (
                                        <Link to={`/article/${article.id}`} className="w-full h-60 shrink-0 snap-center relative rounded-lg overflow-hidden cursor-pointer" key={i} onClick={() => navigate(`/article/${popularArticle.id}`)}>
                                            <div className="absolute top-0 left-0 w-full h-full bg-black/50 text-slate-100 px-4 py-4 flex flex-col justify-end items-start">
                                                <div>
                                                    <h2 className="text-2xl font-bold line-clamp-2">{article.title}</h2>
                                                </div>
                                                <div>
                                                    <h3 className="text-md font-semibold">{article.author}</h3>
                                                </div>
                                                <div>
                                                    <p className="text-xs line-clamp-3">{article.content}</p>
                                                </div>
                                            </div>
                                            <img className="w-full h-full object-center object-cover" src={getImageUrl(article.image_url)} alt="" />


                                        </Link>

                                    ))
                                }


                            </div>
                        </div>
                    </div>
                    : <Loading />
                }
            </header>

        </>
    )
}
