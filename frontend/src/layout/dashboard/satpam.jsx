import { Link, useLocation, Outlet } from "react-router-dom";

export default function SatpamDashboardLayout() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
        <ul
          style={{
            background: "linear-gradient(to top, #ff7e5f, #feb47b)",
          }}
          className="navbar-nav sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/* Sidebar - Brand */}
          <li className="sidebar-brand d-flex align-items-center justify-content-center mb-4">
            <Link
              to="/dashboardpam/satpam"
              className="logo d-flex align-items-center me-auto me-xl-0"
            >
              <img
                src="/assets/img/logo.png"
                alt="logo"
                style={{ height: 48, marginRight: 8 }}
              />
            </Link>
          </li>

          <hr className="sidebar-divider my-0" />

          {/* Dashboardpam */}

          <hr className="sidebar-divider" />

          <div className="sidebar-heading text-white" style={{ fontSize: 13 }}>
            Manajemen Barang
          </div>

          <li
            className={`nav-item${
              isActive("/dashboardpam/item") ? " active" : ""
            }`}
          >
            <Link className="nav-link" to="/dashboardpam/item">
              <i className="fas fa-search"></i>
              <span className="ml-2">Barang Hilang</span>
            </Link>
          </li>
          <li
            className={`nav-item${
              isActive("/dashboardpam/verification") ? " active" : ""
            }`}
          >
            <Link className="nav-link" to="/dashboardpam/verification">
              <i className="fas fa-check-circle"></i>
              <span className="ml-2">Verifikasi</span>
            </Link>
          </li>
          <li
            className={`nav-item${
              isActive("/dashboardpam/storage") ? " active" : ""
            }`}
          >
            <Link className="nav-link" to="/dashboardpam/storage">
              <i className="fas fa-check-circle"></i>
              <span className="ml-2">Storage</span>
            </Link>
          </li>
        </ul>
        {/* End of Sidebar */}

        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              {/* Sidebar Toggle (Topbar) */}
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i className="fa fa-bars"></i>
              </button>

              {/* Topbar Search */}
              <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>

              {/* Topbar Navbar */}
              <ul className="navbar-nav ml-auto">
                {/* Nav Item - Search Dropdown (Visible Only XS) */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="searchDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-search fa-fw"></i>
                  </a>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                  <Link
                    className="nav-link dropdown-toggle"
                    to={"/"}
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                      Home
                    </span>
                    <i
                      className="bi bi-house-fill"
                      style={{ fontSize: "2rem", color: "orange" }}
                    ></i>
                  </Link>
                  {/* Dropdown - User Information */}
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <a
                      className="dropdown-item"
                      href="#"
                      data-toggle="modal"
                      data-target="#logoutModal"
                    >
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <div className="container-fluid">
              <Outlet />
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}

          {/* Footer */}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>© 2025 NF SmartFinder | All Rights Reserved</span>
              </div>
            </div>
          </footer>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}

      {/* Scroll to Top Button*/}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>

      {/* Logout Modal*/}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ready to Leave?
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Select "Logout" below if you are ready to end your current
              session.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <a className="btn btn-primary" href="login.html">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
