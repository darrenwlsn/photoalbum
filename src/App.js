import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AlbumProvider from './providers/AlbumProvider';
import Folder from './components/Folder';
import Upload from './components/Upload';
import Gallery from './components/Gallery';
import Details from './components/Details';
import NotFound from './components/pages/NotFound';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';
require('dotenv').config();

const config = {
  issuer: 'https://dev-344587.okta.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oaemmoa1UV8x9Q9G356'
}



class App extends Component {


  render() {
    return (
      <AlbumProvider>
        <React.Fragment>

          {/* <AppNavbar /> */}

          <div className="container">
            <Router>
              <Security issuer={config.issuer}
                client_id={config.client_id}
                redirect_uri={config.redirect_uri}
              >
                <Home />


                <Switch>
                  {/* <Route exact path="/" /> */}
                  <Route path='/' exact={true} />
                  <Route path='/implicit/callback' component={ImplicitCallback} />
                  <SecureRoute exact path="/folders" component={Folder} />
                  <SecureRoute exact path="/upload" component={Upload} />
                  <SecureRoute exact path="/gallery" component={Gallery} />
                  <SecureRoute exact path="/details" component={Details} />
                  {/* <Route exact path="/login" component={LoginPage} /> */}
                  <Route component={NotFound} />



                </Switch>
              </Security>
            </Router>
          </div>

        </React.Fragment>
      </AlbumProvider>
    );
  }
}

export default App;
