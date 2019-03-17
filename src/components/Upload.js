import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
const request = require('superagent');

const imageMaxSize = 10000000; //bytes
class Upload extends Component {

  handleOnDrop = (acceptedFiles) => {
    const req = request.post('/upload')
    acceptedFiles.forEach(file => {
      req.attach(file.name, file)
    })
    req.end(() => { alert('file  uploaded') });

  }

  handleOnDropRejected = (rejectedFiles) => {
    const rejectedFile = rejectedFiles[0];
    const rejectedFileSize = rejectedFile.size;
    const rejectedFileType = rejectedFile.type;
    console.log(`File too large or not of image type. Size: ${rejectedFileSize}, Type:  ${rejectedFileType}`, rejectedFiles);
    if (rejectedFileSize > imageMaxSize) {
      alert('this file is too big');
    }
  }

  render() {
    return (
      <div>
        <h1>Drag Drop File</h1>
        {/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}> */}
        <Dropzone multiple={false} accept='image/*' onDropAccepted={this.handleOnDrop} onDropRejected={this.handleOnDropRejected} maxSize={imageMaxSize}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <textarea rows="5" cols="50">Drag 'n' drop some files here, or click to select files</textarea>
              </div>
            </section>
          )}
        </Dropzone>
      </div >
    )
  }
}


export default Upload;
