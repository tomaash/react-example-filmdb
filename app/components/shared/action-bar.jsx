import React from 'react';
import {Button} from 'react-bootstrap';

export default class ActionBar extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }
  static propTypes = {
    item: React.PropTypes.object,
    modalTrigger: React.PropTypes.object,
    deleteAction: React.PropTypes.func,
    showRoute: React.PropTypes.string
  }
  delete() {
    this.props.deleteAction(this.props.item._id);
  }
  edit() {
    this.props.modalTrigger.props.modal.props.editItem = this.props.item;
    this.props.modalTrigger.show();
  }
  showProfile() {
    return this.context.router.transitionTo(this.props.showRoute, {id: this.props.item._id});
  }
  render() {
    return (
      <div className="action">
        <span className="action-buttons">
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            onClick={this.showProfile.bind(this)}>Show</Button>
          <Button
            bsStyle="warning"
            bsSize="xsmall"
            onClick={this.edit.bind(this)}>Edit</Button>
          <Button
            bsStyle="danger"
            bsSize="xsmall"
            onClick={this.delete.bind(this)}>Delete</Button>
        </span>
      </div>
    );
  }
}
