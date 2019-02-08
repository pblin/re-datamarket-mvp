import * as React from "react";
import {Grid} from "@material-ui/core";
import {FileUpload} from "../../Common/FileUpload";
import SchemaList from "../SchemaList/SchemaList";

interface SchemaUploadProps {
  onSchemaFileChange: any;
  onSchemaUpload: any;
  schemaFile: any;
}

export class SchemaUpload extends React.Component<SchemaUploadProps> {

  constructor(props: SchemaUploadProps) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.upload = this.upload.bind(this);
    this.renderFileContent = this.renderFileContent.bind(this);
  }

  onFileChange(fileId: string, file: File) {
    this.props.onSchemaFileChange(fileId, file);
  }

  upload(fileId: string) {
    console.log('Here is the file upload');
    console.log(fileId);
    this.props.onSchemaUpload(fileId);
  }

  renderFileContent() {
    if(this.props.schemaFile && this.props.schemaFile.content){
      return (<SchemaList schemas={this.props.schemaFile.content}/>);
    } else if(!this.props.schemaFile || (this.props.schemaFile && !this.props.schemaFile.content)) {
      return (<FileUpload fileId="schemaFile" onFileChange={this.onFileChange} upload={this.upload}/>);
    }
  }

  render() {
    return (
      <Grid container={true} justify={'center'}>
        {this.renderFileContent()}

      </Grid>
    )
  }
}
