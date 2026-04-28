
import { Bookmark } from "lucide-react"
import { useState, useEffect } from "react"
import NavbarTop from "../../components/navbar/navbar-top";
import NavbarBottom from "../../components/navbar/navbar-bottom";
import Main from "../../components/shared-component/main";
import { getArticleBookmarked, removeArticleBookmarkedById } from "../../utils/article";
import { getImageUrl } from "../../api/image";
import { Link } from "react-router-dom";

export default function Bookmarked() {
    const [bookmarkedArticle, setBookmarkedArticle] = useState(getArticleBookmarked())


    function onBookmarkedArticle(article) {
        removeArticleBookmarkedById(article.id)
        setBookmarkedArticle(getArticleBookmarked())
    }



    return (
        <>
            <NavbarTop />
            <Main>
                <div className="flex flex-col gap-8 px-5">
                    <div className="flex flex-col gap-1 ">
                        <h1 className="text-lg text-slate-900 dark:text-slate-100 font-bold">Bookmarked</h1>
                        <p className="text-sm text-slate-900 dark:text-slate-100 ">This page allows you to see all your Bookmarked Article</p>
                    </div>
                    <div className="flex flex-col gap-4 text-slate-900 dark:text-slate-100">
                        {bookmarkedArticle.map((article, i) => (
                            <div ey={i} className="flex flex-col gap-4 px-2 py-4 shadow-sm dark:shadow-slate-700 rounded-lg">
                                <div >
                                    <img className="rounded-xl w-full h-38 object-cover object-center" src={getImageUrl(article.image_url)} alt="" />
                                </div>

                                <div className="px-4 flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <Link to={`/article/${article.id}`} k className="text-xl font-bold">{article.title}</Link>

                                        <Bookmark onClick={() => onBookmarkedArticle(article)} className={`cursor-pointer  text-red-700`} />
                                    </div>
                                    <div>
                                        <p className="text-sm line-clamp-2">{article.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>

                </div>

            </Main>

            <NavbarBottom />

        </>
    )
}
