import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { AlbumConsumer } from '../../providers/AlbumProvider';

class AppNavbar extends Component {

  render() {
    return (
      <AlbumConsumer>
        {value => {
          const { selectedFolder } = value;
          // var selectedFolder = folders.length > 0 ? folders[1].name : '';
          // let selectedFolderArr = folders.filter(folder => folder.isSelected);
          // if (selectedFolderArr.length > 0) selectedFolder = selectedFolderArr[0].name;

          return (
            <React.Fragment>

              <div>
                <Navbar bg="light" expand="lg">
                  <Navbar.Brand href="#home">Viewing Album: {localStorage.getItem("selectedFolder")}</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                      <Nav.Link href="/">Home</Nav.Link>
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
          )
        }
        }
      </AlbumConsumer>
    )
  }

}


export default AppNavbar;