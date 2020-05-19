import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav'

class NavBar extends React.Component {
    render() {
      return (
        <React.Fragment>
          <Navbar bg="primary">
            <Navbar.Brand onClick={() => this.props.history.push('/')}>StarNetwork</Navbar.Brand>
            <Navbar.Collapse>
              <Nav>
                <span className={'account-address'}>{this.props.account}</span>
                <NavDropdown title="" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">My Stars</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </React.Fragment>
      )
    }
  };

  export default NavBar;