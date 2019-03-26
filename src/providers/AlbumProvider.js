import React, { Component } from 'react';
import axios from 'axios';

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
    folders: [],
    new_folder: '',
    error: null,
    dispatch: action => this.setState(state => reducer(state, action))
  };


  async componentDidMount() {
    const res = await axios
      .get('http://localhost:3001/folders');
    // .get(`${process.env.REACT_APP_API_URL}/folders`);


    this.setState({ folders: res.data });

  }
  // fetchTheFolders = async () => {
  //   await axios.get('http://localhost:3001/folders')
  //     .then(res => {
  //       const thefolderlist = res.data;

  //       this.setState({ folders: thefolderlist });
  //     })
  // }



  render() {
    return (
      <AlbumContext.Provider value={this.state}>
        {this.props.children}
      </AlbumContext.Provider>
    )
  }
}

export default AlbumProvider;