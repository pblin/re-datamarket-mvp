import * as React from "react";
import {Grid} from "@material-ui/core";
import {FileUpload} from "../../Common/FileUpload";
import SchemaList from "../SchemaList/SchemaList";
import NotificationLabel from "../../Common/NotificationLabel";

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
    this.props.onSchemaUpload(fileId);
  }

  renderErrors(errors: any[]) {
    return(
      errors.map((error, index) => {
        return (
          <NotificationLabel key={'notification-'+index}
                             type="error">
            <strong>ERROR </strong>{error.dataPath} {error.message} {JSON.stringify(error.params)}
          </NotificationLabel>
        )
      })
    )
  }

  renderFileContent() {
    if(!this.props.schemaFile || (this.props.schemaFile && !this.props.schemaFile.content)) {
      return (<FileUpload fileId="schemaFile" onFileChange={this.onFileChange} upload={this.upload}/>);
    } else if(this.props.schemaFile.errors) {
      return (this.renderErrors(this.props.schemaFile.errors));
    } else if(this.props.schemaFile && this.props.schemaFile.content){
      return (<SchemaList schemas={this.props.schemaFile.content}/>);
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
