import React from 'react';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/Navbar'
import StarDetails from './components/StarDetails';
import SearchStars from './components/SearchStars';


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
