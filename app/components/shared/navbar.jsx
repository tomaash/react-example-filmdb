import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {Link} from 'react-router';
import {NavItemLink} from 'react-router-bootstrap';
import {Alert, Button} from 'react-bootstrap';

import StatusStore from 'stores/status-store';
import StatusActions from 'actions/status-actions';
import LoginActions from 'actions/login-actions';

@connectToStores
export default class Navbar extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }
  static getStores() {
    return [
      StatusStore
    ];
  }
  static getPropsFromStores() {
    return StatusStore.getState();
  }
  retry() {
    StatusActions.retry();
  }
  logout() {
    LoginActions.logout();
  }
  render() {
    var errorComponent;
    var retryComponent;
    var busyComponent;
    if (this.props.error) {
      if (this.props.retryData) {
        retryComponent = <Button onClick={this.retry} bsStyle="danger" bsSize="xsmall" className="pull-right">Retry</Button>;
      }
      errorComponent = (
      <Alert bsStyle='danger'>
      <strong>Network Error!</strong>
      {retryComponent}
      </Alert>);
    }
    // Prerender busy on server as not to lose markup state on client
    if (this.props.busy || !process.env.BROWSER) {
      busyComponent = <div className="busy-indicator pull-right"><i className="fa fa-refresh fa-spin"></i></div>;
    }
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to='app' className="navbar-brand">
                <i className="fa fa-film"></i> FilmDB
              </Link>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <NavItemLink to='directors'>Directors</NavItemLink>
              </li>
              <li>
                <NavItemLink to='films'>Films</NavItemLink>
              </li>
            </ul>
            <ul className="nav navbar-nav pull-right">
              <li onClick={this.logout.bind(this)}>
                <a href="#">Logout</a>
              </li>
            </ul>
            {busyComponent}
          </div>
        </nav>
        {errorComponent}
      </div>
    );
  }
}


