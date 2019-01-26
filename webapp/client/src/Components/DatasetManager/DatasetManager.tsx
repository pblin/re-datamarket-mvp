import * as React from "react";
import {connect} from "react-redux";
import {FileManager} from "../../services/FileManager";

interface ComponentProps {}

class DatasetManager extends React.Component<ComponentProps> {
  boundActionCreators: any;
  dispatch: any;
  fileManager: FileManager;
  constructor(props: any, fileManager: FileManager) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.upload = this.upload.bind(this);
    this.fileManager = new FileManager();
  }

  componentDidMount() {
    console.log('The component did mount');
  }


  handleClick() {
    console.log('The button was clicked');
  }

  async upload() {
    console.log('upload button clicked');
    let fileElement = document.getElementById('file');

    if(!fileElement) {
      return;
    }

    let file: File = (fileElement as any).files[0];
    console.log(file);

    //TODO: NOW HOOK THIS ALL UP WITH REDUX and REDUX SAGA
    //let result = await this.fileManager.readFile(file);
    //console.log('made it here');
    //console.log(result);
    //TODO: USE REAL TYPES
    //console.log(this.props);
    (this.props as any).onFileUpload(file);
  }

  render() {
    return <div>
      <h1>Create Schema Form</h1>
      <button onClick={this.handleClick}></button>
      <input type="file"  accept=".json,application/json" id="file"/>
      <button type="button" onClick={this.upload}>Upload</button>
    </div>
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onFileUpload: (file: File) => dispatch({ type: "FILE_UPLOADED", value: file }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetManager);
