import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";
import { Dropdown, Icon } from "semantic-ui-react";
import { DropdownInitial } from "./HeaderComponents/UserDropdown";
//import styles from "./Header.module.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="tranparent" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && (
              <React.Fragment>
                {/* <NavItem>
                
                  <Link href="/signin">
                    <NavLink>Sign in</NavLink>
                  </Link>
                </NavItem> */}
                <NavItem>
                  <DropdownInitial />
                  {/* <Link href="/signup">
                    <NavLink>Create your account</NavLink>
                  </Link> */}
                </NavItem>
              </React.Fragment>
            )}
            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <Dropdown icon="user" />
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            <NavItem>
              <Link href="/products">
                <NavLink>Shop</NavLink>
              </Link>
            </NavItem>

            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  Signout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
