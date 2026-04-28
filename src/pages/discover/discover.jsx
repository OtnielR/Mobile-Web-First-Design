import NavbarTop from "../../components/navbar/navbar-top"
import NavbarBottom from "../../components/navbar/navbar-bottom"
import Main from "../../components/shared-component/main"
import { Search } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { getGenres } from "../../services/genre"
import { getArticle } from "../../services/article"
import Loading from "../../components/shared-component/loading"
import { getImageUrl } from "../../api/image"
import { Link } from "react-router-dom"
import { Bookmark } from "lucide-react"
import { addArticleBookmarked, getArticleBookmarked, getArticleBookmarkedById, removeArticleBookmarkedById } from "../../utils/article"


export default function Discover() {
    const [articles, setArticles] = useState([])
    const [genres, setGenres] = useState()
    const [selectedCategory, setSelectedCategory] = useState()
    const [loading, setLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [page, setPage] = useState(1)
    const searchRef = useRef()
    const timerRef = useRef()
    const loaderRef = useRef()
    const perPage = 5

    async function fetchData() {
        let categoryId = ""

        if (selectedCategory) {
            categoryId = selectedCategory.id
        } else {
            categoryId = ""
        }

        const articleResponse = await getArticle(page, perPage, null, searchRef.current.value, categoryId)
        const genresResponse = await getGenres()

        console.log(genresResponse)
        console.log(articleResponse)

        setGenres(genresResponse)
        setArticles(articleResponse.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting) {
                setLoading(true)

                try {
                    const nextPage = page + 1

                    let categoryId = ""

                    if (selectedCategory) {
                        categoryId = selectedCategory.id
                    } else {
                        categoryId = ""
                    }

                    const articleResponse = await getArticle(nextPage, perPage, null, searchRef.current.value, categoryId)

                    console.log(articleResponse)

                    console.log(nextPage, articleResponse.last_page)

                    if (nextPage <= articleResponse.last_page) {
                        setPage(nextPage);
                        setArticles(prev => [...prev, ...articleResponse.data]);
                    } else {
                        console.log("Has no more data")
                        setHasMoreData(false)
                    }

                } catch (error) {
                    console.error(error)
                } finally {
                    setLoading(false)
                }

            }
        }, { threshold: 1 })

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => observer.disconnect()

    }, [loaderRef.current, page])

    async function onInputChange() {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(async () => {
            const searchValue = searchRef.current.value

            if (searchValue.trim()) {
                let categoryId = ""

                if (selectedCategory) {
                    categoryId = selectedCategory.id
                } else {
                    categoryId = ""
                }

                const articleResponse = await getArticle(1, perPage, null, searchValue, categoryId)

                console.log(articleResponse)
                setArticles(articleResponse.data)
                setHasMoreData(true)
                setPage(1)
            }
        }, 500)
    }

    async function onCategoryChange(category) {
        console.log(category)

        if (selectedCategory === category) {
            setSelectedCategory(null)
            const articleResponse = await getArticle(1, perPage, null, searchRef.current.value, "")

            setArticles(articleResponse.data)
        } else {
            setSelectedCategory(category)

            const articleResponse = await getArticle(1, perPage, null, searchRef.current.value, category.id)

            setArticles(articleResponse.data)
        }

        setPage(1)

        setHasMoreData(true)
    }



    return (
        <>
            <NavbarTop />
            <Main>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 px-4">
                        <div className="flex gap-3 items-center w-full px-4 py-1 border border-gray-600 text-slate-900 dark:text-slate-100 dark:border-gray-200 rounded-full">
                            <input className="outline-none flex-1 px-2 py-1   text-slate-900 dark:text-slate-100 rounded-lg" type="text" placeholder="Search..." ref={searchRef} onInput={onInputChange} />

                            <Search className="flex-none text-slate-900 dark:text-slate-100" />
                        </div>
                        <div className="flex flex-col gap-3 text-slate-900 dark:text-slate-100">
                            {genres ?

                                <div className="flex gap-3 px-2">
                                    {genres.map((genre, i) => (
                                        <button key={i} onClick={() => onCategoryChange(genre)} className={`text-slate-900 dark:text-slate-100 px-3 py-2 text-sm rounded-xl transition-all duration-300 hover:cursor-pointer ${selectedCategory?.title == genre.title ? "bg-blue-600 dark:bg-blue-600 text-white dark:text-slate-100 " : "bg-gray-100 dark:bg-slate-600"}`}>
                                            {genre.title}
                                        </button>
                                    ))}


                                </div>
                                :
                                <div>

                                </div>}
                        </div>

                    </div>

                    <div className="px-4">
                        <div className="flex flex-col gap-1 ">
                            <h1 className="text-lg text-slate-900 dark:text-slate-100 font-bold">Discover</h1>
                            <p className="text-sm text-slate-900 dark:text-slate-100 ">This page allows you to discover all article available</p>
                        </div>
                        {articles ?
                            <div className="flex flex-col gap-4 text-slate-900 dark:text-slate-100">
                                {articles.map((article, i) => (
                                    <div key={i} className="flex flex-col gap-4 px-2 py-4 shadow-sm dark:shadow-slate-700 rounded-lg">
                                        <div >
                                            <img className="rounded-xl w-full h-38 object-cover object-center" src={getImageUrl(article.image_url)} alt="" />
                                        </div>

                                        <div className="px-4 flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <Link to={`/article/${article.id}`} className="w-3/4 text-xl font-bold line-clamp-2">{article.title}</Link>

                                                <Bookmark onClick={(e) => onBookmarkedArticle(e, article)} className={`cursor-pointer  `} />
                                            </div>
                                            <div>
                                                <p className="text-sm line-clamp-2">{article.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            : <Loading />}
                    </div>


                    {hasMoreData && articles ?
                        <div ref={loaderRef}>
                            <Loading />
                        </div>
                        : <div></div>}
                </div>
            </Main>
            <NavbarBottom />

        </>
    )
}
