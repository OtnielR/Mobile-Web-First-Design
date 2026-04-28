import { useState, useEffect } from "react";
import NavbarTop from "../../components/navbar/navbar-top";
import NavbarBottom from "../../components/navbar/navbar-bottom";
import Main from "../../components/shared-component/main";
import { getGenres } from "../../services/genre";

export default function Settings() {

    const [genres, setGenres] = useState()
    const [category, setCategory] = useState(localStorage.getItem("category"))
    const [theme, setTheme] = useState(localStorage.getItem("theme"))
    const root = window.document.documentElement

    async function fetchData() {
        const genresResponse = await getGenres()

        console.log(genresResponse)

        setGenres(genresResponse)
    }

    function handleThemeChange(e) {

        const newTheme = e.target.value

        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)

        if (newTheme === 'dark') {
            root.classList.add('dark');
        } else if (newTheme === 'light') {
            root.classList.remove('dark');
        } else {
            const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', isSystemDark);
        }
    }

    function handleCategoryChange(e) {

        const newCategory = e.target.value
        const category = genres.filter(g => g.title == newCategory)[0]

        console.log(category)

        setCategory(newCategory)
        localStorage.setItem("category", newCategory)
        localStorage.setItem("categoryId", category.id)
    }



    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <NavbarTop />
            <Main>
                <div className="flex flex-col gap-8 px-5">
                    <div className="flex flex-col gap-1 ">
                        <h1 className="text-lg text-slate-900 dark:text-slate-100 font-bold">Settings</h1>
                        <p className="text-sm text-slate-900 dark:text-slate-100 ">This page allows you to change your preferences</p>
                    </div>
                    <div className="flex flex-col gap-3 px-2 text-md text-slate-900 dark:text-slate-100">
                        <div className="flex justify-between items-center mb-3 border-b border-b-slate-900 dark:border-b-slate-100 pb-3">
                            <p>
                                Theme
                            </p>
                            <div>
                                <select className="w-32 border px-1 py-1 rounded-lg outline-none" onChange={handleThemeChange} defaultValue={theme} name="" id="">
                                    <option className="dark:bg-slate-900" value="light">Light</option>
                                    <option className="dark:bg-slate-900" value="dark">Dark</option>
                                    <option className="dark:bg-slate-900" value="system">System</option>
                                </select>
                            </div>
                        </div>
                        {genres ?
                            <div className="flex justify-between items-center mb-3 border-b border-b-slate-900 dark:border-b-slate-100 pb-3">
                                <p>
                                    Category
                                </p>
                                <div>
                                    <select className="w-32 border px-1 py-1 rounded-lg outline-none" onChange={handleCategoryChange} defaultValue={category} name="" id="">
                                        {genres.map((genre, i) => (
                                            <option className="dark:bg-slate-900" key={i}>{genre.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            :
                            <div>Loading...</div>

                        }
                    </div>
                </div>
            </Main>
            <NavbarBottom />

        </>
    )
}
