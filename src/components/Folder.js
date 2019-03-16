import React, { Component } from 'react';
//const Checkbox = require('rc-checkbox');

const myfolders = [
  { name: 'default', isSelected: false },
  { name: 'dogs', isSelected: true },
  { name: 'cats', isSelected: false },
  { name: 'cars', isSelected: false },
];

class Folder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      folders: myfolders,
      new_folder: '',
      error: null
    };
  }



  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.new_folder === '') return;
    if (this.state.new_folder !== '' && this.state.folders.find(entry => entry['name'] === this.state.new_folder)) {
      this.setState({ error: 'This folder already exists. Please use a unique name.' })
      return;
    }
    this.setState({ folders: this.state.folders.concat([{ name: this.state.new_folder, isSelected: false }]) });
    this.setState({ new_folder: '' });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value, error: null });
  }

  handleChecked = (event) => {
    const { name, value } = event.target;
    const myBoolValue = value === 'on' ? true : false;
    const newState = this.state.folders.map(item => {
      if (item.name === name) {
        item.isSelected = myBoolValue;
      } else {
        item.isSelected = false;
      }
      return item;
    })
    this.setState({ folders: newState });

  }

  render() {
    const { folders, new_folder, error } = this.state;
    return (
      <React.Fragment>
        <h1>
          <span className="text-danger">Folder</span> List
        </h1>
        <form>
          {folders.map(folder => (
            (
              <div className="card card-body mb-4">
                <h4>
                  <label>
                    {folder.name + " "}
                    <input
                      name={folder.name}
                      type="checkbox"
                      checked={folder.isSelected}
                      onChange={this.handleChecked}
                    />
                  </label>
                </h4>
              </div>
            )))}
        </form>
        <div className="card mb-3">
          <div className="card-header">Add New Folder</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
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

export default Folder;


