import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
      <a className="navbar-brand text-info font-weight-bolder" href="/">
        <span className="">Accounting Record</span>
      </a>
      <button
        className="custom-toggler navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample09"
        aria-controls="navbarsExample09"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarsExample09"
      >
        <a className="nav-link text-info" href="/contact">
          <Link to="/productos">productos</Link>
        </a>

        <a className="nav-link text-info" href="/login">
          {" "}
          <Link to="/Factura">Factura</Link>
        </a>
        <a className="nav-link text-info" href="/contact">
        <Link to="/Clientes">Clientes</Link>
        </a>
        <a className="nav-link text-info" href="/contact">
        <Link to="/Proveedores">Proveedores</Link>
        </a>
        <a className="nav-link text-info" href="/contact">
          Settings
        </a>
        <a className="nav-link text-info" href="/contact">
          Rate us
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
