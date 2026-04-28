import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import NavbarTop from "../../components/navbar/navbar-top"
import NavbarBottom from "../../components/navbar/navbar-bottom"
import Main from "../../components/shared-component/main"
import Loading from "../../components/shared-component/loading"
import { Bookmark } from "lucide-react"
import { getArticle, getArticleById } from "../../services/article"
import { formatDate } from "../../utils/date"
import { getImageUrl } from "../../api/image"
import { addArticleBookmarked, getArticleBookmarked, getArticleBookmarkedById, removeArticleBookmarkedById } from "../../utils/article"

export default function ArticleDetails() {
    const navigate = useNavigate()
    const params = useParams()
    const [article, setArticle] = useState()
    const [recommendedArticle, setRecommendedArticle] = useState()


    const [bookmarked, setBookmarked] = useState(false)

    const articleId = params.id

    async function fetchData() {
        const articleResponse = await getArticleById(articleId)
        if (!articleResponse.title) {
            navigate("/")
        }

        const recommendedArticleResponse = await getArticle(1, 4, null, null, articleResponse.genre_id)
        console.log(recommendedArticleResponse)

        const filteredRecommendArticle = recommendedArticleResponse.data.filter(article => article.id !== articleResponse.id)

        setArticle(articleResponse)
        setRecommendedArticle(filteredRecommendArticle)


        const isArticleBookmarked = getArticleBookmarkedById(articleResponse.id)


        if (isArticleBookmarked.length > 0) {
            setBookmarked(true)
        } else {
            setBookmarked(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    function bookmarkedArticle(article) {
        const isArticleExist = getArticleBookmarkedById(article.id)

        if (isArticleExist.length != 0) {
            removeArticleBookmarkedById(article.id)
            setBookmarked(false)

        } else {
            console.log("addArticle")
            addArticleBookmarked(article)
            setBookmarked(true)

        }

        console.log(bookmarked)

    }



    console.log(articleId)

    return (
        <>
            <NavbarTop />

            <Main>
                {article ?
                    <div className="flex flex-col gap-4 px-4 py-4">
                        <div className="flex flex-col gap-3 text-slate-900 dark:text-slate-100 ">
                            <div className="flex justify-between items-center">
                                <h2 className="text-sm"><Link to="/" className="text-blue-600 hover:underline">Article.id</Link> {">"} {article.title}</h2>
                                <div>
                                    <Bookmark onClick={() => bookmarkedArticle(article)} className={`cursor-pointer  ${bookmarked ? "text-red-700" : "text-slate-900 dark:text-slate-100"}`} />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{article.title}</h1>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-200">{article.author} | {formatDate(article.publish_date)}</p>
                            </div>
                        </div>
                        <div className="rounded-xl overflow-hidden">
                            <img className="w-full h-42 rounded-xl object-cover object-center" src={getImageUrl(article.image_url)} alt="Article image.png" />
                        </div>
                        <div className="text-sm text-slate-900 dark:text-slate-100 px-3 text-justify">
                            <p>{article.content}</p>
                        </div>
                    </div>
                    : <Loading />}

                <div className="flex flex-col gap-4 px-4 py-4">
                    <div className="flex flex-col gap-3 text-slate-900 dark:text-slate-100 ">
                        <div>
                            <h1 className="text-lg font-bold">Article menarik lainnya</h1>
                        </div>
                    </div>

                    {recommendedArticle ?
                        <div className="grid grid-cols-1 gap-6 px-4">
                            {recommendedArticle.map((article, i) => (
                                <Link to={`/article/${article.id}`} className="h-48 shrink-0 snap-center relative rounded-lg overflow-hidden cursor-pointer" key={i} onClick={() => navigate(`/article/${popularArticle.id}`)}>
                                    <div className="absolute top-0 left-0 w-full h-full bg-black/50 text-slate-100 px-4 py-4 flex flex-col justify-end items-start">
                                        <div>
                                            <h2 className="text-xl font-bold">{article.title}</h2>
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

                            ))}
                        </div>
                        : <Loading />}
                </div>

            </Main>
            <NavbarBottom />

        </>
    )

}
