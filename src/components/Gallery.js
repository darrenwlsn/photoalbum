import React, { Component } from 'react'
import axios from 'axios';

class Gallery extends Component {

  state = { contents: [] };
  async componentDidMount() {
    const mySelected = localStorage.getItem("selectedFolder");
    const url = `http://localhost:3001/thumbs/${mySelected}`;
    //const url = `http://localhost:3001/contents/Notes`;

    const res = await axios
      .get(url)
      .catch((e) => {
        alert('error' + e);
      });
    //const temp = [{ name: 'the file' }];
    this.setState({ ...this.state, contents: res.data });
  }

  render() {
    const contents = this.state.contents;
    return (
      <React.Fragment>
        {
          contents.map(file => (
            <img src={file.name} />
          ))
        }
      </React.Fragment>
    )
  }

}


export default Gallery;
