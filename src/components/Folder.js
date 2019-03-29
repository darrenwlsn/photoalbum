import React, { Component } from 'react';
import { AlbumConsumer } from '../providers/AlbumProvider';
//const Checkbox = require('rc-checkbox');

class Folder extends Component {

  state = {
    new_folder: ''
  };

  handleSubmit = (dispatch, folders, event) => {
    event.preventDefault();
    // const { new_folder, folders } = this.state;
    const { new_folder } = this.state;
    if (new_folder === '') return;
    if (new_folder !== '' && folders.find(entry => entry['name'] === new_folder)) {
      dispatch({ type: 'ERROR', payload: { error: 'This folder already exists. Please use a unique name.' } });
      return;
    }
    this.setState({ new_folder: '' });
    dispatch({ type: 'ADD_FOLDER', payload: { folders: folders, newFolder: [{ name: new_folder, isSelected: false }] } });

  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value, error: null });
  }

  handleChecked = (dispatch, folders, event) => {
    const { name, value } = event.target;
    //const myBoolValue = value === 'on' ? true : false;
    const newState = folders.map(item => {
      if (item.name === name) {
        item.isSelected = true;
        localStorage.setItem("selectedFolder", item.name);

      } else {
        item.isSelected = false;
      }
      return item;
    })
    this.setState({ 'new_folder': '' });
    dispatch({ type: 'UPDATE_FOLDERS', payload: { folders: newState, selectedFolder: name } });


  }

  render() {

    return (
      <AlbumConsumer>
        {value => {
          const { dispatch, folders, error } = value;
          const new_folder = this.state.new_folder;

          return (
            <React.Fragment>
              <h1>
                <span className="text-danger">Albums</span> Available
              </h1>
              <form>
                {folders.map(myfolder => (
                  (
                    <div className="card card-body mb-4">
                      <h4>
                        <label>
                          {myfolder.name + " "}
                          <input
                            name={myfolder.name}
                            type="checkbox"
                            checked={myfolder.isSelected}
                            onChange={this.handleChecked.bind(this, dispatch, folders)}
                          />
                        </label>
                      </h4>
                    </div>
                  )))}
              </form>
              <div className="card mb-3">
                <div className="card-header">Add New Folder</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit.bind(this, dispatch, folders)}>
                    <input
                      label="Folder Name"
                      name="new_folder"
                      type="text"
                      placeholder="Enter New Folder Name"
                      value={new_folder}
                      onChange={this.handleChange}
                    />
                    <input type="submit" value="Add Folder" className="btn btn-dark" />
                    {error && <div className="alert alert-danger">{error}</div>}
                  </form></div>
              </div>
            </React.Fragment>
          )
        }
        }
      </AlbumConsumer>
    )

  }
}

export default Folder;


