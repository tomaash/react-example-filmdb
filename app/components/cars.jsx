'use strict';

import React from 'react';
import AltContainer from 'alt/AltContainer';
import CarsTable from './cars-table';

export default class Cars extends React.Component {
  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }
  render() {
    return (
      <AltContainer
        flux={this.props.flux}
        stores={{CarsStore: this.props.flux.getStore('cars')}}
        actions={{CarsActions: this.props.flux.getActions('cars')}}>
        <CarsTable/>
        <p>foobar</p>
      </AltContainer>
    );
  }
}

