'use strict';

import React from 'react';

if (process.env.BROWSER) {
  require('styles/footer.scss');
}

export default React.createClass({
  displayName: 'footer',
  render() {
    return (
      <footer className='app--footer'>
        <hr />
        <div className='app--footer-content'>
          <p>foobar</p>
        </div>
      </footer>
    );
  }
});
