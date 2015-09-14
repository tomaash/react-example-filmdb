import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import StatusStore from 'stores/status-store';

@connectToStores
export default class Footer extends React.Component {
  static getStores() {
    return [
      StatusStore
    ];
  }
  static getPropsFromStores() {
    return StatusStore.getState();
  }
  render() {
    return (
      <footer className='app-footer'>
        <hr />
        <div className='app-footer-content'>
          <p>Created by Tomas Holas for educational purposes. Please do not abuse.</p>
        </div>
      </footer>
    );
  }
}

