import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import SurveyDelete from './surveys/SurveyDelete';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  /* <Header /> => <Route path="/" component={Header} /> */
  render() {
    return (
      <div>
        <div className="container">
          <BrowserRouter>
            <div>
              <Header />
              <Route exact path="/" component={Landing} />
              <Route exact path="/surveys" component={Dashboard} />
              <Route path="/surveys/new" component={SurveyNew} />
              <Route path="/surveys/delete" component={SurveyDelete} />
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
};

function changeBackground(color) {
   document.body.style.background = color;
};

window.addEventListener("load",function() { changeBackground('#F7F5F6') });

export default connect(null, actions)(App);
