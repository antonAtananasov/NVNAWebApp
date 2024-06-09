import NavBar from "../components/NavBar.tsx";

interface Props {
    children: React.ReactNode;
}
const Layout = ({children}:Props)  => {

    return (
        <>

            <NavBar>
            </NavBar>
            <div style={{width:"100%", backgroundColor: "white", height:""}}>
                <h1>gvhbjnk</h1>

            </div>
            <div></div>
            <div>
                {children}
            </div>
            <div></div>
            <div>

            </div>

            {/* Navigation bar, Footer, whatever... */}
        </>
    )
}
export default Layout