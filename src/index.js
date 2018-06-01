import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Redux Container
import { Provider } from 'react-redux';
import store from './store';

// Containers
import Simple from './containers/Simple/';
import css from './styles/styles.css';


const history = createBrowserHistory();

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path='/' name='Home' component={Simple}/>
      </Switch>
    </Router>
  </Provider>
), document.getElementById('root'));
