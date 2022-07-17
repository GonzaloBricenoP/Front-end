import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="/Sales" className="brand-link">
                <img src="https://fizz.cl/fancybox-pics/corporativo/00gigante-logo.jpg" alt="Cloud Sales Logo" className="brand-image img-rounded elevation-4" style={{opacity: ''}} />
                <span className="brand-text font-weight-light" >Gigante del <strong>Pacífico</strong></span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg" className="img-circle elevation-4" />
                    </div>
                    <div className="info">
                        <span className="d-block text-white">Usuario</span>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-header">Accesos</li>
                        <li className="nav-item">
                            <Link to="/Sales"  className="nav-link">
                                <i className="nav-icon fas fa-cart-shopping" />
                                <p>Menú de ventas</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Sales"  className="nav-link">
                                <i className="nav-icon fas fa-user" />
                                <p>Menú de clientes</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/products"  className="nav-link">
                                <i className="nav-icon fas fa-box" />
                                <p>Menú de productos</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/a"  className="nav-link">
                                <i className="nav-icon fas fa-users" />
                                <p><strong>¿Usuarios?</strong></p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
export default Sidebar;