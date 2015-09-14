'use strict';

import React from 'react';
import Formsy from 'formsy-react';

export default React.createClass({
  displayName: 'BootstrapInput',
  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],
  propTypes: {
    name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired
  },

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function () {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    var className = this.showRequired() ? 'required' : (!this.isPristine() && this.showError()) ? 'error' : '';

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.getErrorMessage();

    var inputClass = this.props.type === 'textarea' ? 'textarea' : 'input';

    return (
      <div className={className + ' form-group'}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        {React.createElement(inputClass, {
          className: 'form-control',
          type: this.props.type || 'text',
          name: this.props.name,
          onChange: this.changeValue,
          value: this.getValue()
        })}
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});
