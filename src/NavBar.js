import { NavLink } from "react-router-dom"

function NavBar({onChangePage}){

    function handleLinkClick(e) {
        e.preventDefault()
        onChangePage(e.target.pathname)
    }

    return(
        <nav style={{'background-color': "white"}}>
            {/* <a onClick={(e)=>handleLinkClick(e)}  href="/">Home</a>
            <a onClick={(e)=>handleLinkClick(e)} href="/inquiries">Inquires</a>
            <a onClick={(e)=>handleLinkClick(e)} href="/about">About</a> */}
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/inquiries">Inquiries</NavLink>
            <NavLink to="/about">About</NavLink>
            

        </nav>
    )



}

export default NavBar;