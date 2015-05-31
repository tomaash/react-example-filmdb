import React from 'react';
import FilmForm from './film-form';
import {ModalTrigger, Button} from 'react-bootstrap';
import ActionBar from 'components/shared/action-bar';

import DirectorsActions from 'actions/directors-actions';
import FilmsActions from 'actions/films-actions';

export default class FilmsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static contextTypes = {
    router: React.PropTypes.func
  }
  static propTypes = {
    FilmsStore: React.PropTypes.object,
    DirectorsStore: React.PropTypes.object
  }
  componentWillMount() {
    FilmsActions.fetch();
    DirectorsActions.fetch();
  }
  directorName(id) {
    const data = this.props.DirectorsStore.directorsHash[id];
    return data && data.name;
  }
  add() {
    this.refs.modalTrigger.props.modal.props.editItem = null;
    this.refs.modalTrigger.show();
  }
  render() {
    return (
      <div className="container-fluid">
        <h1>Films</h1>
        <ModalTrigger ref="modalTrigger" modal={
          <FilmForm
            flux={this.props.flux}
            directors={this.props.DirectorsStore.directors}/>
          }><span/>
        </ModalTrigger>
        <Button bsStyle="primary" bsSize="large" onClick={this.add.bind(this)}>Add new film</Button>
        <br/>
        <table className="table table-striped item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Director</th>
              <th>Year</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.FilmsStore.films && this.props.FilmsStore.films.map((item, index) =>
            <tr key={index}>
              <td>{item.name}</td>
              <td>{this.directorName(item.director)}</td>
              <td>{item.year}</td>
              <td className="ellipsis">{item.description}</td>
              <td>
                <ActionBar
                  item={item}
                  showRoute="film"
                  deleteAction={FilmsActions.delete}
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

