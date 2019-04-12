import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { AlbumConsumer } from './providers/AlbumProvider';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    // Redirect to '/' after login
    this.props.auth.login('/');
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.auth.logout('/');
  }


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
                    {this.state.authenticated ? <Nav.Link href="#logout" onClick={this.logout}>Logout</Nav.Link> : <Nav.Link href="#login" onClick={this.login}>Login</Nav.Link>}

                  </Navbar.Collapse>
                </Navbar>
              </div>

            </React.Fragment>
          )
        }
        }
      </AlbumConsumer>
    )
  }
}
);