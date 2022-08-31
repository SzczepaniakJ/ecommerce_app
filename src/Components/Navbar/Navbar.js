import React from "react";
import CurrenciesDropMenu from "./NavbarComponents/CurrenciesDropMenu/CurrenciesDropMenu";
import NavbarCategories from "./NavbarComponents/NavbarCategories/NavbarCategories";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import ShoppingCart from "./NavbarComponents/ShoppingCart/ShoppingCart";

class Navbar extends React.Component {
  render() {
    return (
      <div className={[classes.Navbar].join(" ")}>
        <NavbarCategories />
        <Link className={classes.logo} to="/">
          <img src="/images/logo.png" alt="Logo" className={classes.logo} />
        </Link>
        <div className={classes.rightSide}>
          <CurrenciesDropMenu />
          <ShoppingCart />
        </div>
      </div>
    );
  }
}

export default Navbar;
