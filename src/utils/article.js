export function addArticleBookmarked(newArticle) {
    const isArticleExist = getArticleBookmarkedById(newArticle.id)

    if (isArticleExist.length > 0) {
        return
    }

    const existingData = localStorage.getItem("bookmarked") || "[]"

    const cartArray = JSON.parse(existingData)

    cartArray.push(newArticle)

    localStorage.setItem("bookmarked", JSON.stringify(cartArray))
}

export function getArticleBookmarked() {
    const storedData = localStorage.getItem("bookmarked") || "[]"

    const parsedArray = JSON.parse(storedData)

    return parsedArray
}

export function getArticleBookmarkedById(id) {
    const storedData = localStorage.getItem("bookmarked") || "[]"

    const parsedArray = JSON.parse(storedData)

    console.log(parsedArray)

    const article = parsedArray.filter(article => article.id === id)

    console.log(article)

    return article
}

export function removeArticleBookmarkedById(id) {
    const storedData = localStorage.getItem("bookmarked") || "[]"

    const parsedArray = JSON.parse(storedData)

    console.log(parsedArray)

    const filteredArticle = parsedArray.filter(article => article.id !== id)


    localStorage.setItem("bookmarked", JSON.stringify(filteredArticle))
}
