'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
// import Formsy from 'formsy-react';
// import BootstrapInput from 'components/shared/bootstrap-input';
import FormModal from './form-modal';
import {ModalTrigger, Button} from 'react-bootstrap';
import moment from 'moment';

export default React.createClass({
  displayName: 'Directors',
  mixins: [ListenerMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  directorsStore() {
    return this.props.flux.getStore('directors');
  },
  directorsActions() {
    return this.props.flux.getActions('directors');
  },
  getInitialState() {
    return this.directorsStore().getState();
  },
  componentWillMount() {
    return this.directorsActions().fetch();
  },
  componentDidMount() {
    this.listenTo(this.directorsStore(), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  delete(item, index) {
    this.directorsActions().delete(item, index);
  },
  edit(item) {
    this.setState({editItem: item});
    this.refs.modalTrigger.show();
  },
  add() {
    this.setState({editItem: null});
    this.refs.modalTrigger.show();
  },
  render() {
    return (
      <div className="container-fluid">
        <h1>Directors</h1>
        <ModalTrigger ref="modalTrigger" modal={<FormModal flux={this.props.flux} editItem={this.state.editItem} />}><span/>
        </ModalTrigger>
        <Button bsStyle="primary" bsSize="large" onClick={this.add}>Add new director</Button>
        <br/>
        <table className="table table-striped item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Nationality</th>
              <th>Birthday</th>
              <th>Biography</th>
            </tr>
          </thead>
          <tbody>
            {this.state.directors.map((item, index) =>
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.nationality}</td>
              <td>{moment(item.birthday).format('D MMMM YYYY')}</td>
              <td className="ellipsis">{item.biography}</td>
              <td>
              <div className="action">
                <span className="action-buttons">
                  <button className='btn btn-xs btn-primary'>Show</button>
                  <button onClick={this.edit.bind(this, item)} className='btn btn-xs btn-warning'>Edit</button>
                  <button onClick={this.delete.bind(this, item, index)} className='btn btn-xs btn-danger'>Delete</button>
                </span>
              </div>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
});
// <Formsy.Form ref="filmForm" onSubmit={this.submit}>
//   <BootstrapInput name="name" title="Name" type="text"/>
//   <BootstrapInput name="director" title="Director" type="text"/>
//   <BootstrapInput name="year" title="Year" type="text"/>
//   <BootstrapInput name="description" title="Description" type="textarea"/>
//   <button className="btn btn-default" type="submit">{this.state.editItem ? 'Update' : 'Create'}</button>
// </Formsy.Form>

