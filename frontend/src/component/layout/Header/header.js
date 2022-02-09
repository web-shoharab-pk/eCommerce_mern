import React, { Fragment } from 'react';
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap';
import { Link, NavLink as ActiveRoute } from 'react-router-dom';
import "./Header.css";

const header = () => {


  return (

    <Fragment>
      <Navbar className="header-navbar" fixed="top" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            ECOMMERCE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink component={Link} href="/">Home</NavLink>
              <NavLink component={NavLink} href="/products">Products</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              <NavLink component={ActiveRoute} href="/about">About</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </Fragment>
  );
};

export default header;