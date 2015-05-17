import React from 'react';
import Formsy from 'formsy-react';
import BootstrapInput from 'components/shared/bootstrap-input';
import {Modal, Button} from 'react-bootstrap';

const FormModal = React.createClass({
  propTypes: {
    onRequestHide: React.PropTypes.func,
    flux: React.PropTypes.object.isRequired,
    editItem: React.PropTypes.object
  },
  componentDidMount() {
    this.refs.filmForm.reset(this.props.editItem);
  },
  filmsActions() {
    return this.props.flux.getActions('films');
  },
  submit(model) {
    if (this.props.editItem) {
      this.filmsActions().update(model, this.props.editItem);
    }
    else {
      this.filmsActions().add(model);
    }
    this.refs.filmForm.reset();
    // React complains if we update
    // DOM with form validations after close
    // so let's wait one tick
    setTimeout(this.close, 0);
  },
  close() {
    this.props.onRequestHide();
  },
  send() {
    this.refs.filmForm.submit();
  },
  render() {
    var title, send;
    if (this.props.editItem) {
      title = 'Edit film ' + this.props.editItem.name;
      send = 'Update';
    } else {
      title = 'Add new film';
      send = 'Create';
    }
    return (
      <Modal {...this.props} ref="modalInstance" title={title} animation={false}>
        <div className='modal-body'>
          <Formsy.Form ref="filmForm" onValidSubmit={this.submit}>
            <BootstrapInput name="name" title="Name" type="text"/>
            <BootstrapInput name="director" title="Director" type="text"/>
            <BootstrapInput name="year" title="Year" type="text"/>
            <BootstrapInput name="description" title="Description" type="textarea"/>
          </Formsy.Form>
        </div>
        <div className='modal-footer'>
          <Button className="pull-left" ref="closeButton" onClick={this.close}>Close</Button>
          <Button bsStyle="success" type="submit" onClick={this.send}>{send}</Button>
        </div>
      </Modal>
    );
  }
});

export default FormModal;
