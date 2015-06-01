import React from 'react';
import AltContainer from 'alt/AltContainer';
import FilmsTable from './films-table';

import DirectorsStore from 'stores/directors-store';
import FilmsStore from 'stores/films-store';
import {authDecorator} from 'utils/component-utils';

@authDecorator
export default class Films extends React.Component {
  static willTransitionTo(transition) {
    console.log(transition);
  }
  render() {
    return (
      <AltContainer
        stores={{
          FilmsStore: FilmsStore,
          DirectorsStore: DirectorsStore
        }}>
        <FilmsTable/>
      </AltContainer>
    );
  }
}
