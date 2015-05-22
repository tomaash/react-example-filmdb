'use strict';

import React from 'react';
import AltContainer from 'alt/AltContainer';
import DirectorsTable from './directors-table';

export default class Directors extends React.Component {
  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }
  render() {
    return (
      <AltContainer
        flux={this.props.flux}
        stores={{DirectorsStore: this.props.flux.getStore('directors')}}
        actions={{DirectorsActions: this.props.flux.getActions('directors')}}>
        <DirectorsTable/>
      </AltContainer>
    );
  }
}
