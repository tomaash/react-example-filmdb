'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'footer',
  render() {
    return (
      <footer className='app-footer'>
        <hr />
        <div className='app-footer-content'>
          <p>foobar</p>
        </div>
      </footer>
    );
  }
});
