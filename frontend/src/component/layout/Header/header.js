import React, { Fragment } from 'react';
import { Nav, Navbar, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Header.css";

const header = () => {


  return (

    <Fragment>
      <Navbar className="header-navbar" fixed="top" variant="dark" expand="lg">
        {/* <Container> */}
        <Navbar.Brand href="/">
          ECOMMERCE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link component={NavLink} to="/"> Home</Link>
            <Link component={NavLink} to="/account">Account</Link>
            <Link component={NavLink} to="/products">Products</Link>
            <Link component={NavLink} to="/contact">Contact</Link>
            <Link component={NavLink} to="/search">Search</Link>
            <Link component={NavLink} to="/about">About</Link>
            <Link component={NavLink} to="/login">Login</Link>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
      <br />
    </Fragment>
  );
};

export default header;