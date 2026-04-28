import api from "../api/axios";

export async function getArticleById(id) {
    return await api.get(`/articles/${id}`)
        .then(response => {
            const responseData = response.data


            return responseData
        })
        .catch(error => {
            return { status: "Error", message: "Something went wrong" }
        })

}

export async function getArticle(page, perPage, orderBy, search, category) {
    let url = "/articles?"

    if (page) {
        url += `page=${page}&`
    }
    if (perPage) {
        url += `per_page=${perPage}&`
    }
    if (orderBy) {
        url += `order_by=${orderBy}&`
    }
    if (search) {
        url += `search=${search}&`
    }
    if (page) {
        url += `category=${category}&`
    }

    console.log(url)

    return await api.get(url)
        .then(response => {
            const responseData = response.data


            return responseData
        })
        .catch(error => {
            return { status: "Error", message: "Something went wrong" }
        })
}
