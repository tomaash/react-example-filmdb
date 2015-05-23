import React from 'react';
import DirectorForm from './director-form';
import {ModalTrigger, Button} from 'react-bootstrap';
import moment from 'moment';
import connectToStores from 'alt/utils/connectToStores';

@connectToStores
export default class DirectorsTable extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }
  static propTypes = {
    flux: React.PropTypes.object,
    directors: React.PropTypes.array,
    directorsHash: React.PropTypes.object
  }
  static getStores(props) {
    return [props.flux.getStore('directors')];
  }
  static getPropsFromStores(props) {
    return props.flux.getStore('directors').getState();
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.actions = this.props.flux.getActions('directors');
  }
  componentWillMount() {
    return this.actions.fetch();
  }
  delete(item) {
    this.actions.delete(item._id);
  }
  edit(item) {
    this.setState({editItem: item});
    this.refs.modalTrigger.show();
  }
  add() {
    this.setState({editItem: null});
    this.refs.modalTrigger.show();
  }
  showProfile(item) {
    return this.context.router.transitionTo('director', {id: item._id});
  }
  render() {
    return (
      <div className="container-fluid">
        <h1>Directors</h1>
        <ModalTrigger
          ref="modalTrigger"
          modal={
            <DirectorForm
              flux={this.props.flux}
              editItem={this.state.editItem}
             />}>
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
            {this.props.directors && this.props.directors.map((item, index) =>
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.nationality}</td>
              <td>{moment(item.birthday).format('D MMMM YYYY')}</td>
              <td className="ellipsis">{item.biography}</td>
              <td>
              <div className="action">
                <span className="action-buttons">
                  <Button
                    bsStyle="primary"
                    bsSize="xsmall"
                    onClick={this.showProfile.bind(this, item)}>Show</Button>
                  <Button
                    bsStyle="warning"
                    bsSize="xsmall"
                    onClick={this.edit.bind(this, item)}>Edit</Button>
                  <Button
                    bsStyle="danger"
                    bsSize="xsmall"
                    onClick={this.delete.bind(this, item)}>Delete</Button>
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
