import React, { Component } from 'react'
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css'
import urlconfig from '../urlconfig';
const request = require('superagent');


const imageMaxSize = 10000000; //bytes

class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  }

  // specify upload params and url for your files
  getUploadParams = ({ file, meta }) => {
    const body = new FormData();
    body.append('file', file);
    body.append('title', this.state.title);
    body.append('description', this.state.description);
    body.append('selectedFolder', localStorage.getItem("selectedFolder"));
    if (JSON.parse(localStorage.getItem("okta-token-storage")).accessToken === undefined) return;
    const token = JSON.parse(localStorage.getItem("okta-token-storage")).accessToken.accessToken;

    return { url: `${urlconfig.apiUrl}/upload`, body: body, headers: { Authorization: `Bearer ${token}` } }
  };

  // called every time a file's `status` changes
  handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) };

  // receives array of files that are done uploading when submit button is clicked
  handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  };

  render() {
    return (

      <div className="container-fluid mt-2">
        <form>
          <Dropzone
            getUploadParams={this.getUploadParams}
            onChangeStatus={this.handleChangeStatus}
            onSubmit={this.handleSubmit}
            accept="image/*,audio/*,video/*"
            maxFiles={1}
            multiple={false}
            styles={{
              dropzone: { height: 300 },
              dropzoneActive: { borderColor: 'green' },
            }}
          />

          <div className="form-group mt-2">
            <label htmlFor="title">Title: </label>
            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleChange} />
          </div>


          <div className="form-group">
            <label htmlFor="description">Description: </label>
            <textarea rows="3" className="form-control" name="description" value={this.state.description} onChange={this.handleChange} />
          </div>



        </form>
      </div>
    )

  }
}



export default Upload;
