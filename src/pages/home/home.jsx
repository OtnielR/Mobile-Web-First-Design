import NavbarTop from "../../components/navbar/navbar-top"
import NavbarBottom from "../../components/navbar/navbar-bottom"
import Header from "../../components/home/header"
import Main from "../../components/shared-component/main"
import ContentRecommendation from "../../components/home/content-recomendation"

export default function Home() {
    return (
        <>
            <NavbarTop />
            <Main >
                <Header />
                <ContentRecommendation />
            </Main>
            <NavbarBottom />

        </>
    )
}
