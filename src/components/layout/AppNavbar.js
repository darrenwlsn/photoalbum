import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

function AppNavbar() {

  return (
    <React.Fragment>

      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Actions" id="basic-nav-dropdown">
                <NavDropdown.Item href="/folders">Select Folder</NavDropdown.Item>
                <NavDropdown.Item href="/gallery">Browse</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/upload">Upload File</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>;
    </div>

    </React.Fragment>
  );

}


export default AppNavbar;