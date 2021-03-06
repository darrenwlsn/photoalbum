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
      caption: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  }

  toast = (innerHTML) => {
    const el = document.getElementById('toast')
    el.innerHTML = innerHTML
    el.className = 'show'
    setTimeout(() => { el.className = el.className.replace('show', '') }, 3000)
  }

  // specify upload params and url for your files
  getUploadParams = ({ file, meta }) => {
    const body = new FormData();
    body.append('file', file);
    body.append('name', meta.name);
    body.append('title', this.state.title);
    body.append('caption', this.state.caption);
    body.append('selectedFolder', localStorage.getItem("userkey") + '/' + localStorage.getItem("selectedFolder"));
    if (JSON.parse(localStorage.getItem("okta-token-storage")).accessToken === undefined) return;
    const token = JSON.parse(localStorage.getItem("okta-token-storage")).accessToken.accessToken;

    return { url: `${urlconfig.apiUrl}/upload`, body: body, headers: { Authorization: `Bearer ${token}` } }
  };

  // called every time a file's `status` changes
  handleChangeStatus = ({ meta, remove }, status) => {
    if (status === 'headers_received') {
      this.toast(`${meta.name} uploaded!`)
      //remove()
    } else if (status === 'aborted') {
      this.toast(`${meta.name}, upload failed...`)
    }
  }

  // receives array of files that are done uploading when submit button is clicked
  handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  };

  render() {
    return (

      <div className="container-fluid mt-2">
        <form>
          <div id="toast">Upload</div>
          <Dropzone
            getUploadParams={this.getUploadParams}
            onChangeStatus={this.handleChangeStatus}
            onSubmit={this.handleSubmit}
            onSuccess={(file, res) => {
              alert(res.status);
            }}
            accept="image/*,audio/*,video/*"
            maxFiles={1}
            multiple={true}
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
            <label htmlFor="caption">Caption: </label>
            <textarea rows="3" className="form-control" name="caption" value={this.state.caption} onChange={this.handleChange} />
          </div>

          

        </form>
      </div>
    )

  }
}



export default Upload;
