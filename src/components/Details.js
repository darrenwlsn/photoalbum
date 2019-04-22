import React, { Component } from 'react';
import axios from 'axios';
import urlconfig from '../urlconfig';

const queryString = require('query-string');


class Details extends Component {
  constructor(props) {
    super(props);
    var parsed = queryString.parse(this.props.location.search);

    this.state = {
      fileLoc: parsed.fileLocation,
      title: '',
      caption: ''
    };
  }



  async componentDidMount() {
    let token = '';
    try {
      token = JSON.parse(localStorage.getItem("okta-token-storage")).accessToken.accessToken;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      };

      const res = await axios({
        method: 'get',
        url: `${urlconfig.apiUrl}/metadata?fileLoc=${this.state.fileLoc}`,
        //url: 'https://mighty-forest-31646.herokuapp.com/folders',
        headers: headers
      }).catch(e => {
        alert('error!! ' + e);
        return;
      });
      if (res.data) {
        this.setState({ ...this.state, title: res.data.title, caption: res.data.caption });
      }
    } catch (e) {
      return;  // not yet authenticated
    }

  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const myurl = `${urlconfig.apiUrl}/metadata`;
    if (JSON.parse(localStorage.getItem("okta-token-storage")).accessToken === undefined) return false;
    const token = JSON.parse(localStorage.getItem("okta-token-storage")).accessToken.accessToken;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };

    var idx1 = this.state.fileLoc.indexOf('s3.amazonaws.com') + 17;
    var parts = this.state.fileLoc.substring(idx1).split('/');
    const mydata = {
      bucket: parts[0],
      userBucket: parts[1],
      userFolder: parts[2],
      fileLoc: this.state.fileLoc,
      title: this.state.title,
      caption: this.state.caption
    }

    const res = await axios({
      method: 'put',
      url: `${myurl}`,
      headers: headers,
      data: mydata
    }).catch(e => {
      alert('error!! ' + e);
      return false;
    });
    this.props.history.push(`/gallery`)
  };

  handleDownload = (event) => {
    const myFile = this.state.fileLoc.replace('thumb_', '');
    window.open(myFile);
  }

  render() {
    return (
      <React.Fragment>

        <div class="container">
          <img src={this.state.fileLoc} />

          <form onSubmit={this.handleSubmit}>

            <div className="form-group mt-2">
              <label htmlFor="title">Title: </label>
              <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleChange} />
            </div>


            <div className="form-group">
              <label htmlFor="caption">Caption: </label>
              <textarea rows="3" className="form-control" name="caption" value={this.state.caption} onChange={this.handleChange} />
            </div>

            <button type="submit" class="btn btn-primary">Save</button>

            <button class="btn btn-primary ml-2" onClick={this.handleDownload}>Download</button>

          </form>
        </div>




      </React.Fragment>

    )
  }
}

export default Details;

