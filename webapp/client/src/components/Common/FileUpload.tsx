import * as React from "react";

interface FileUploadProps {
  fileId: string,
  onFileChange: any;
  upload: any;
}

export class FileUpload extends React.Component<FileUploadProps> {

  constructor(props: FileUploadProps) {
    super(props);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.upload = this.upload.bind(this);
  }

  handleFileChange() {
    let fileElement = document.getElementById(this.props.fileId);
    if(!fileElement) {
      return;
    }

    let file: File = (fileElement as any).files[0];
    console.log(file);

    this.props.onFileChange(this.props.fileId, file);
    //Everytime the file changes we need to update the state(need it to get the filename)
    //this.props.datasetFileChange(file);
  }

  async upload() {
    this.props.upload(this.props.fileId);
  }

  render() {
    return (
      <div>
        <input type="file" id={this.props.fileId} onChange={this.handleFileChange} accept=".json,application/json"/>
        <button type="button" onClick={this.upload}>Upload</button>
      </div>
    )
  }
}
