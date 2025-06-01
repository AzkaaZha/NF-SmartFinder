function header() {
    return(
        <header id="header" className="header d-flex align-items-center fixed-top">
            <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

            <a href="index.html" className="logo d-flex align-items-center me-auto me-xl-0">
                <img src="/assets/img/logo.png" alt="logo" />
            </a>

            <nav id="navmenu" className="navmenu">
                <ul>
                    <li><a href="#hero" className="active">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li className="dropdown"><a href="#"><span>Features</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                        <ul>
                            <li><a href="#">Lapor Barang Temuan</a></li>
                            <li><a href="#">Lapor Barang Hilang</a></li>
                        </ul>
                    </li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a className="btn-getstarted" href="/login" >Login/Register</a></li>
                </ul>
                <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

            

            </div>
        </header>
    )
}

export default header