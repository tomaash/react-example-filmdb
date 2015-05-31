import React from 'react';
import Formsy from 'formsy-react';
import BootstrapInput from 'components/shared/bootstrap-input';
import PikadayInput from 'components/shared/pikaday-input';
import SelectInput from 'components/shared/select-input';
import {Modal, Button} from 'react-bootstrap';
import countries from 'utils/countries';
import {defer} from 'lodash';

import DirectorsActions from 'actions/directors-actions';

export default class DirectorForm extends React.Component {
  static propTypes = {
    onRequestHide: React.PropTypes.func,
    editItem: React.PropTypes.object
  }
  componentDidMount() {
    // Convert birthday to Date object to allow editing
    if (this.props.editItem) {
      this.props.editItem.birthday = new Date(this.props.editItem.birthday);
    }
    this.refs.directorForm.reset(this.props.editItem);
  }
  submit(model) {
    if (this.props.editItem) {
      DirectorsActions.update(this.props.editItem._id, model);
    }
    else {
      DirectorsActions.add(model);
    }
    this.refs.directorForm.reset();
    // React complains if we update
    // DOM with form validations after close
    // so let's wait one tick
    defer(this.close.bind(this));
  }
  close() {
    this.props.onRequestHide();
  }
  send() {
    this.refs.directorForm.submit();
  }
  render() {
    var title;
    var send;
    var nameError = 'Must have at least 2 letters';
    var textError = 'Must have at least 10 letters';
    var nationError = 'Nationality must be selected';
    if (this.props.editItem) {
      title = 'Edit director ' + this.props.editItem.name;
      send = 'Update';
    }
    else {
      title = 'Add new director';
      send = 'Create';
    }
    return (
      <Modal {...this.props} ref="modalInstance" title={title} animation={false}>
        <div className='modal-body'>
          <Formsy.Form ref="directorForm" onValidSubmit={this.submit.bind(this)}>
            <BootstrapInput
              name="name"
              title="Name"
              type="text"
              validations="minLength:2"
              validationError={nameError}/>
            <SelectInput
              name="nationality"
              title="Nationality"
              options={countries.options}
              validations="minLength:1"
              validationError={nationError}/>
            <PikadayInput
              name="birthday"
              title="Birthday"
              type="text"
              validationError={nameError}/>
            <BootstrapInput
              name="biography"
              title="Biography"
              type="textarea"
              validations="minLength:10"
              validationError={textError}/>
          </Formsy.Form>
        </div>
        <div className='modal-footer'>
          <Button className="pull-left" ref="closeButton" onClick={this.close.bind(this)}>Cancel</Button>
          <Button bsStyle="success" type="submit" onClick={this.send.bind(this)}>{send}</Button>
        </div>
      </Modal>
    );
  }
}
