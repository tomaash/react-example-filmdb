import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import {Link} from 'react-router';
import {NavItemLink} from 'react-router-bootstrap';
import {Alert, Button} from 'react-bootstrap';

@connectToStores
export default class Navbar extends React.Component {
  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }
  static contextTypes = {
    router: React.PropTypes.func
  }
  static getStores(props) {
    return [
      props.flux.getStore('status')
    ];
  }
  static getPropsFromStores(props) {
    return props.flux.getStore('status').getState();
  }
  retry() {
    this.props.flux.getActions('status').retry();
  }
  logout() {
    console.log('logout!');
    this.props.flux.getActions('login').logout();
    this.context.router.transitionTo('login');
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
              <li>
                <NavItemLink to='login'>Login</NavItemLink>
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


