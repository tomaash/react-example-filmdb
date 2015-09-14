import React from 'react';
import Formsy from 'formsy-react';
import BootstrapInput from 'components/shared/bootstrap-input';
import SelectInput from 'components/shared/select-input';
import {Modal, Button} from 'react-bootstrap';
import {defer} from 'lodash';

import FilmsActions from 'actions/films-actions';

export default class FilmForm extends React.Component {
  static propTypes = {
    onRequestHide: React.PropTypes.func,
    editItem: React.PropTypes.object,
    directors: React.PropTypes.array
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.refs.filmForm.reset(this.props.editItem);
  }
  submit(model) {
    if (this.props.editItem) {
      FilmsActions.update(this.props.editItem._id, model);
    }
    else {
      FilmsActions.add(model);
    }
    this.refs.filmForm.reset();
    // React complains if we update
    // DOM with form validations after close
    // so let's wait one tick
    defer(this.close.bind(this));
  }
  close() {
    this.props.onRequestHide();
  }
  send() {
    this.refs.filmForm.submit();
  }
  render() {
    var title;
    var send;
    var nameError = 'Must have at least 2 letters';
    var idError = 'Director must be selected';
    var textError = 'Must have at least 10 letters';
    var yearError = 'Must be a year from 20th or 21st century';
    if (this.props.editItem) {
      title = 'Edit film ' + this.props.editItem.name;
      send = 'Update';
    }
    else {
      title = 'Add new film';
      send = 'Create';
    }
    return (
      <Modal {...this.props} ref="modalInstance" title={title} animation={false}>
        <div className='modal-body'>
          <Formsy.Form ref="filmForm" onValidSubmit={this.submit.bind(this)}>
            <BootstrapInput
              name="name"
              title="Name"
              type="text"
              validations="minLength:2"
              validationError={nameError}/>
            <SelectInput
              name="director"
              title="Director"
              validations="isLength:24"
              validationError={idError}
              options={this.props.directors.map(x => {
                return {value: x._id, label: x.name};
              })}/>
            <BootstrapInput
              name="year"
              title="Year"
              type="text"
              validations={{matchRegexp: /^(19|20)\d{2}$/}}
              validationError={yearError}/>
            <BootstrapInput
              name="description"
              title="Description"
              type="textarea"
              validations="minLength:10"
              validationError={textError}/>
          </Formsy.Form>
        </div>
        <div className='modal-footer'>
          <Button className="pull-left" ref="closeButton" onClick={this.close.bind(this)}>Close</Button>
          <Button bsStyle="success" type="submit" onClick={this.send.bind(this)}>{send}</Button>
        </div>
      </Modal>
    );
  }
}
