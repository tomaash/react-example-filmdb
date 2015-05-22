'use strict';

import React from 'react';
import DirectorsForm from './directors-form';
import {ModalTrigger, Button} from 'react-bootstrap';
import moment from 'moment';
import autobound from 'es7-autobinder';

export default class DirectorsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static contextTypes = {
    router: React.PropTypes.func
  }
  static propTypes = {
    flux: React.PropTypes.object.isRequired,
    DirectorsActions: React.PropTypes.object,
    DirectorsStore: React.PropTypes.object
  }
  componentWillMount() {
    return this.props.DirectorsActions.fetch();
  }
  delete(item) {
    this.props.DirectorsActions.delete(item._id);
  }
  edit(item) {
    this.setState({editItem: item});
    this.refs.modalTrigger.show();
  }
  add() {
    this.setState({editItem: null});
    this.refs.modalTrigger.show();
  }
  render() {
    return (
      <div className="container-fluid">
        <h1>Directors</h1>
        <ModalTrigger
          ref="modalTrigger"
          modal={
            <DirectorsForm
            flux={this.props.flux}
            editItem={this.state.editItem}
            DirectorsActions={this.props.DirectorsActions} />}>
            <span/>
        </ModalTrigger>
        <Button bsStyle="primary" bsSize="large" onClick={this.add.bind(this)}>Add new director</Button>
        <br/>
        <table className="table table-striped item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Nationality</th>
              <th>Birthday</th>
              <th>Biography</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.DirectorsStore.directors && this.props.DirectorsStore.directors.map((item, index) =>
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
                  <button onClick={this.delete.bind(this, item)} className='btn btn-xs btn-danger'>Delete</button>
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
}



