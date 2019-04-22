import React, { Component } from 'react';
import axios from 'axios';
import { withAuth } from '@okta/okta-react';
import urlconfig from '../urlconfig';

const AlbumContext = React.createContext();



const reducer = (state, action) => {
  if (action == null) return state;
  switch (action.type) {
    case 'ADD_FOLDER':
      return {
        ...state,
        folders: action.payload.folders.concat(action.payload.newFolder),
      }
    case 'UPDATE_FOLDERS':
      return {
        ...state,
        folders: action.payload.folders,
        error: null,
        selectedFolder: action.payload.selectedFolder
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

export default class AlbumProvider extends Component {
  //export default withAuth(class AlbumProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      error: null,
      selectedFolder: localStorage.getItem("selectedFolder") ? localStorage.getItem("selectedFolder") : 'default',
      dispatch: action => this.setState(state => reducer(state, action))
    };
    if (localStorage.getItem("selectedFolder") === undefined) {
      localStorage.setItem("selectedFolder", "default");
    }

  }


  async componentDidMount() {
    let token = '';
    try {
      token = JSON.parse(localStorage.getItem("okta-token-storage")).accessToken.accessToken;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      };

      const userBucket = localStorage.getItem("userkey");

      const res = await axios({
        method: 'get',
        url: `${urlconfig.apiUrl}/folders/${userBucket}`,
        //url: 'https://mighty-forest-31646.herokuapp.com/folders',
        headers: headers
      }).catch(e => {
        alert('error!! ' + e);
        return;
      });
      this.setState({ ...this.state, folders: res.data });
    } catch (e) {
      return;  // not yet authenticated
    }

  }



  render() {
    return (
      <AlbumContext.Provider value={this.state}>
        {this.props.children}
      </AlbumContext.Provider>
    )
  }
}
