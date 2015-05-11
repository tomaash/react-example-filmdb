'use strict';

import React from 'react';
import objectAssign from 'react/lib/Object.assign';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {RouteHandler} from 'react-router';

// import Header from 'components/header';
import Navbar from 'components/navbar';
import Footer from 'components/footer';

export default React.createClass({
  displayName: 'App',
  mixins: [ListenerMixin],
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return this.props.flux.getStore('locale').getState();
  },
  componentDidMount() {
    this.listenTo(this.props.flux.getStore('locale'), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.props.flux.getStore('locale').getState());
  },
  render() {
    const props: Object = objectAssign(this.state, this.props);
    return (
      <div className="container-fluid">
        <Navbar {...props} />
        <RouteHandler {...props} />
        <Footer />
      </div>
    );
  }
});
