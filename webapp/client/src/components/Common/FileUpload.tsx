import * as React from "react";
import {Grid, Icon, Typography} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

interface FileUploadProps {
  fileId: string,
  onFileChange: any;
  upload: any;
  displayUpload: boolean;
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
        <div className={'drop-zone'}>
          <Grid item xs={12}>
            <Icon fontSize={"large"}>
              <CloudUploadIcon className={"upload-icon"}/>
            </Icon>
          </Grid>
          <Grid item xs={12}>
            <Typography>Drag And Drop Files Here To Upload</Typography>
          </Grid>
          <label htmlFor={this.props.fileId} className="file-input-label">Or Select A File To Upload</label>
          <input className={"file-input"}
                 type="file"
                 id={this.props.fileId}
                 name={this.props.fileId}
                 onChange={this.handleFileChange}
                 accept=".json,application/json"
          />
          {this.props.displayUpload && (
            <button type="button" onClick={this.upload}>Upload</button>
          )}
        </div>
    )
  }
}
