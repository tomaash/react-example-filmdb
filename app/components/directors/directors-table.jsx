import React from 'react';
import DirectorForm from './director-form';
import ActionBar from 'components/shared/action-bar';
import {ModalTrigger, Button} from 'react-bootstrap';
import moment from 'moment';
import connectToStores from 'alt/utils/connectToStores';
import {authDecorator} from 'utils/component-utils';

import DirectorsStore from 'stores/directors-store';
import DirectorsActions from 'actions/directors-actions';

@authDecorator
@connectToStores
export default class DirectorsTable extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }
  static propTypes = {
    directors: React.PropTypes.array,
    directorsHash: React.PropTypes.object
  }
  static getStores(props) {
    return [DirectorsStore];
  }
  static getPropsFromStores(props) {
    return DirectorsStore.getState();
  }
  static willTransitionTo(transition) {
    console.log(transition);
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    return DirectorsActions.fetch();
  }
  add() {
    this.refs.modalTrigger.props.modal.props.editItem = null;
    this.refs.modalTrigger.show();
  }
  render() {
    return (
      <div className="container-fluid">
        <h1>Directors</h1>
        <ModalTrigger
          ref="modalTrigger"
          modal={<DirectorForm flux={this.props.flux}/>}>
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
                <ActionBar
                  item={item}
                  showRoute="director"
                  deleteAction={DirectorsActions.delete}
                  modalTrigger={this.refs.modalTrigger}/>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
