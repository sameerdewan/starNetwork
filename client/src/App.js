import React from 'react';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Spinner from 'react-bootstrap/Spinner';
import NavBar from './components/Navbar'
import StarDetails from './components/StarDetails';
import SearchStars from './components/SearchStars';
import Web3 from 'web3';
import starNotaryArtifact from '../../build/contracts/StarNetwork.json';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      web3Enabled: false
    };
    this.web3 = undefined;
    this.meta = undefined;
    this.account = undefined;
  }

  componentDidMount() {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      this.enableWeb3();
    }
  }

  async enableWeb3() {
    await window.ethereum.enable();
    const networkId = await this.web3.eth.net.getId();
    const deployedNetwork = starNotaryArtifact.networks[networkId];
    this.meta = new this.web3.eth.Contract(starNotaryArtifact.abi, deployedNetwork.address);
    const accounts  = await this.web3.eth.getAccounts();
    this.account = accounts[0];
    this.setState({web3Enabled: true});
  }

  render() {
    if (this.state.web3Enabled === false) return (
      <div className={'center'}>
        <Spinner animation="grow" variant="primary" size="lg" />
        <br/><br/>
        Searching for web3...
      </div>
    );
    return (
      <React.Fragment>
        <NavBar history={this.props.history} account={this.account}/>
        <Switch>
          <Route exact path={'/'}>
            <SearchStars history={this.props.history}/>
          </Route>
          <Route 
            exact path={'/stars/:searchType/:star'} 
            render={(props) => {
                return (
                  <StarDetails 
                    {...props} 
                    account={this.account} 
                    web3={this.web3} 
                    meta={this.meta} 
                  />
                )
              }
            } 
          />
          <Redirect to={{pathname: "/"}} />
        </Switch>
      </React.Fragment>
    );
  }
};

export default withRouter(App);
