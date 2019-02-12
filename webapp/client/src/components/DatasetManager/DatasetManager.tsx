import * as React from "react";
import {connect} from "react-redux";
import {FileManager} from "../../services/FileManager";
import {DatasetWizard} from "./DatasetWizard/DatasetWizard";
import {
  changeDisplaySchemaError,
  nextStep,
  prevStep,
} from "../../store/datasetForm/actions";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import BasicInfoFrom from './DatasetWizard/BasicInfoForm';
import { submit } from 'redux-form';
import {Grid} from "@material-ui/core";
import {PublishForm} from "./DatasetWizard/PublishForm";
import {basicInfo, schemaSelector} from "../../store/datasetForm/datasetFormSelectors";
import {SchemaUpload} from "./DatasetWizard/SchemaUpload";
import {fileChange} from "../../store/file/actions";
import {getFileState} from "../../store/file/fileSelectors";
import {uploadSchema} from "../Util/SchemaValidator";

interface ComponentProps {
  file: any[],
  fileName: string,
  datasetFileChange: any,
  onFileUpload: any,
  submitBasicInfoForm: any,
  submittingBasicForm: any,
  updateBasicInfo: any,
  wizard: any,
  basicInfo: any,
  nextStep: any,
  prevStep: any,
  fileChange: any,
  schemaFile: any,
  schema: any[],
  noSchemaError: any;
  shouldDisplayNoSchemaError: any;
  displaySchemaError: boolean;
}

class DatasetManager extends React.Component<ComponentProps> {
  fileManager: FileManager;
  constructor(props: any, fileManager: FileManager) {
    super(props);
    this.onWizardNext = this.onWizardNext.bind(this);
    this.onWizardPrev = this.onWizardPrev.bind(this);
    this.handleBasicFormSubmit = this.handleBasicFormSubmit.bind(this);
    this.onSchemaFileChange = this.onSchemaFileChange.bind(this);
    this.onSchemaUpload = this.onSchemaUpload.bind(this);
    this.fileManager = new FileManager();
  }

  onSchemaFileChange(fileId: string, file: File) {
    if(this.props.displaySchemaError) {
      this.props.shouldDisplayNoSchemaError(false);
    }
    this.props.fileChange(fileId, file);
  }

  onSchemaUpload(fileId: string) {
    this.props.onFileUpload(fileId);
  }

  onWizardNext() {
    switch(this.props.wizard.currentStep) {
      case 0:
        this.props.submitBasicInfoForm();
        return;
      case 1:
        if(!this.props.schema.length) {
          this.props.shouldDisplayNoSchemaError(true);
          return;
        }
        break;
      case 2:
        this.publish();
        return;
    }
    this.props.nextStep();
  }

  publish() {
    console.log('THE FORM IS PUBLISHING!');
    console.log(this.props.schema);
    console.log(this.props.basicInfo);
  }

  onWizardPrev() {
    this.props.prevStep();
  }

  handleBasicFormSubmit(values) {
    this.props.nextStep();
  }

  render() {
    return <div>
      <Grid container={true}>
        <DatasetWizard
          steps={this.props.wizard.steps}
          onNext={this.onWizardNext}
          onPrev={this.onWizardPrev}
          currentStep={this.props.wizard.currentStep}
        >
          <BasicInfoFrom onSubmit={this.handleBasicFormSubmit}/>
          <SchemaUpload
            onSchemaFileChange={this.onSchemaFileChange}
            onSchemaUpload={this.onSchemaUpload}
            schemaFile={this.props.schemaFile}
            errors={this.props.schemaFile.errors}
            schema={this.props.schema}
            displayNoSchemaError={this.props.displaySchemaError}
          />
          <PublishForm basicDetails={this.props.basicInfo}></PublishForm>
        </DatasetWizard>
      </Grid>
    </div>
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    schemaFile: Object.assign({}, getFileState(state).files.find(file => file.fileId == 'schemaFile')),
    wizard: state.DatasetFormState.wizard,
    basicInfo: basicInfo(state),
    schema: Object.assign([], schemaSelector(state)),
    displaySchemaError: state.DatasetFormState.displayNoSchemaError
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onFileUpload: (fileId: string) => dispatch({ type: "FILE_UPLOADED", fileId: fileId, validator: uploadSchema, callbackAction: 'LOAD_SCHEMA_LIST' }),
    nextStep: () => dispatch(nextStep()),
    prevStep: () => dispatch(prevStep()),
    submitBasicInfoForm: () => dispatch(submit('contact')),
    fileChange: (fileId, file) => dispatch(fileChange(fileId, file)),
    shouldDisplayNoSchemaError: (shouldDisplay: boolean) => dispatch(changeDisplaySchemaError(shouldDisplay))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetManager);