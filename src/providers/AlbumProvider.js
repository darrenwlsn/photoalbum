import React, { Component } from 'react';

const myfolders = [
  { name: 'default', isSelected: false },
  { name: 'dogs', isSelected: true },
  { name: 'cats', isSelected: false },
  { name: 'cars', isSelected: false },
];

const AlbumContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FOLDER':
      return {
        ...state,
        folders: action.payload.folders.concat(action.payload.newFolder),
        new_folder: ''
      }
    case 'UPDATE_FOLDERS':
      return {
        ...state,
        folders: action.payload.folders,
        error: null,
        new_folder: ''
      }
    case 'ERROR':
      return {
        ...state,
        error: action.payload.error
      }
    case 'RESET_ERROR':
      return {
        ...state,
        error: action.payload.error
      }
    default:
      return state;
  }
}

export const AlbumConsumer = AlbumContext.Consumer;

class AlbumProvider extends Component {
  state = {
    folders: myfolders,
    new_folder: '',
    error: null,
    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    return (
      <AlbumContext.Provider value={this.state}>
        {this.props.children}
      </AlbumContext.Provider>
    )
  }
}

export default AlbumProvider;