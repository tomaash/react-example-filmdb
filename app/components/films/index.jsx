import React from 'react';
import AltContainer from 'alt/AltContainer';
import FilmsTable from './films-table';

export default class Films extends React.Component {
  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }
  render() {
    return (
      <AltContainer
        flux={this.props.flux}
        stores={{
          FilmsStore: this.props.flux.getStore('films'),
          DirectorsStore: this.props.flux.getStore('directors')
        }}
        actions={{
          FilmsActions: this.props.flux.getActions('films'),
          DirectorsActions: this.props.flux.getActions('directors')
        }}>
        <FilmsTable/>
      </AltContainer>
    );
  }
}
