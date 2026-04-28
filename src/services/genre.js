import api from "../api/axios";

export async function getGenres() {
    return await api.get("/genres")
        .then(response => {
            const responseData = response.data

            return responseData
        })
        .catch(error => {
            return { status: "Error", message: "Something went wrong" }
        })
}
