import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class NavBar extends React.Component {
    render() {
      return (
        <React.Fragment>
          <Navbar bg="primary">
            <Navbar.Brand onClick={() => this.props.history.push('/')}>StarNetwork</Navbar.Brand>
          </Navbar>
        </React.Fragment>
      )
    }
  };

  export default NavBar;