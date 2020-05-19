import React from 'react';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Jdenticon from 'react-jdenticon';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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

class SearchStars extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: ''
    }
  }
  render() {
    return (
      <div className={'center'}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search for a star name..."
              aria-label="Star name"
              aria-describedby="basic-addon2"
              onChange={e => this.setState({searchValue: e.target.value})}
              value={this.state.searchValue}
            />
            <InputGroup.Append>
              <Button onClick={() => {
                if (this.state.searchValue.trim() === '') return;
                this.props.history.push(`/stars/${this.state.searchValue}`);
              }}>Search</Button>
            </InputGroup.Append>
          </InputGroup>
      </div>
    );
  }
};

class StarDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starName: props.match.params.starName
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={'star-details'}>
        <Jdenticon size="200" value={this.state.starName} />
        {this.state.starName}
      </div>
    );
  }
}

function StarAvailable() {
  return (
    <div className={'available'}>
      <section>Congradulations, this star is available!</section>
      <br />
      <Button>Claim Star</Button>
    </div>
  );
};

function MyStar() {
  return (
    <div>
      You already own this star!
      <div className={'center available'}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Transfer to address"
                aria-label="Address to Transfer"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button onClick={() => {
                
                }}>Transfer</Button>
              </InputGroup.Append>
            </InputGroup>
            or
            <br/> <br/>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Price to sell for"
                aria-label="Put up for sale"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button onClick={() => {
                
                }}>List Star for Sale</Button>
              </InputGroup.Append>
            </InputGroup>
        </div>
    </div>
  );
};

function StarUnavailable() {
  return (
    <React.Fragment>
      <br/><br/>
      <div>Sorry, this star is unavailable!</div>
    </React.Fragment>
  );
};

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <NavBar history={this.props.history}/>
        <Switch>
          <Route exact path={'/'}>
            <SearchStars history={this.props.history}/>
          </Route>
          <Route exact path={'/stars/:starName'} component={StarDetails} />
          <Redirect to={{pathname: "/"}} />
        </Switch>
      </React.Fragment>
    );
  }
};

export default withRouter(App);
