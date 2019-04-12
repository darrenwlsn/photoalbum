import React, { Component } from 'react'
import axios from 'axios';
import urlconfig from '../urlconfig';

class Gallery extends Component {

  state = { contents: [] };
  async componentDidMount() {
    const mySelected = localStorage.getItem("selectedFolder");
    const myurl = `${urlconfig.apiUrl}/thumbs/${mySelected}`;

    if (JSON.parse(localStorage.getItem("okta-token-storage")).accessToken === undefined) return;
    const token = JSON.parse(localStorage.getItem("okta-token-storage")).accessToken.accessToken;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };

    const res = await axios({
      method: 'get',
      url: `${myurl}`,
      //url: 'https://mighty-forest-31646.herokuapp.com/folders',
      headers: headers
    }).catch(e => {
      alert('error!! ' + e);
      return;
    });
    //const temp = [{ name: 'the file' }];
    this.setState({ ...this.state, contents: res.data });
  }

  showImage = (fileName) => {
    const imgUrl = fileName.replace('thumb_', '');
    window.open(imgUrl, "_self");
  }

  render() {
    const contents = this.state.contents;
    return (
      <React.Fragment>
        {
          contents.map((file, index) => (
            <img src={file.name} onClick={this.showImage.bind(this, file.name)} key={index} />
          ))
        }
      </React.Fragment>
    )
  }

}


export default Gallery;
