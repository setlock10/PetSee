function NavBar({onChangePage}){

    function handleLinkClick(e) {
        e.preventDefault()
        onChangePage(e.target.pathname)
    }

    return(
        <nav>
            <a onClick={(e)=>handleLinkClick(e)}  href="/">Home</a>
            <a onClick={(e)=>handleLinkClick(e)} href="/inquiries">Inquires</a>
            <a onClick={(e)=>handleLinkClick(e)} href="/about">About</a>
        </nav>
    )



}

export default NavBar;