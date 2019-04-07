import React, { Component } from 'react';
import axios from 'axios';
import { withAuth } from '@okta/okta-react';
import urlconfig from '../urlconfig';

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const myfolders = [
  { name: 'default', isSelected: false },
  { name: 'dogs', isSelected: true },
  { name: 'cats', isSelected: false },
  { name: 'cars', isSelected: false },
];

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

export default withAuth(class AlbumProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custom: 'hello',
      folders: [],
      error: null,
      selectedFolder: 'default',
      dispatch: action => this.setState(state => reducer(state, action))
    };
    if (localStorage.getItem("selectedFolder") === undefined) {
      localStorage.setItem("selectedFolder", "default");
    }

  }


  async componentDidMount() {
    if (JSON.parse(localStorage.getItem("okta-token-storage")).accessToken === undefined) return;
    const token = JSON.parse(localStorage.getItem("okta-token-storage")).accessToken.accessToken;
    // const res = await axios
    //   .get('http://localhost:3001/folders')
    //   .catch((e) => {
    //     alert('error' + e);
    //   });
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };

    const res = await axios({
      method: 'get',
      url: `${urlconfig.apiUrl}/folders`,
      //url: 'https://mighty-forest-31646.herokuapp.com/folders',
      headers: headers
    }).catch(e => {
      alert('error!! ' + e);
      return;
    });
    this.setState({ ...this.state, folders: res.data });

  }




  // .get(`${process.env.REACT_APP_API_URL}/folders`);





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
)

//export default AlbumProvider;