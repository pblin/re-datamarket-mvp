import * as React from "react";
import {connect} from "react-redux";
import {FileManager} from "../../services/FileManager";
import {DatasetWizard} from "./DatasetWizard/DatasetWizard";
import {
  nextStep,
  prevStep,
  datasetFileChange,
} from "../../store/datasetForm/actions";
import SchemaList from './SchemaList/SchemaList';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import BasicInfoFrom from './DatasetWizard/BasicInfoForm';
import { submit } from 'redux-form';
import {Grid} from "@material-ui/core";
import {PublishForm} from "./DatasetWizard/PublishForm";
import {basicInfo} from "../../store/datasetForm/datasetFormSelectors";

interface ComponentProps {
  file: any[];
  fileName: string;
  datasetFileChange: any;
  onFileUpload: any;
  submitBasicInfoForm: any;
  submittingBasicForm: any;
  updateBasicInfo: any;
  wizard: any,
  basicInfo: any;
  nextStep: any,
  prevStep: any
}

class DatasetManager extends React.Component<ComponentProps> {
  fileManager: FileManager;
  constructor(props: any, fileManager: FileManager) {
    super(props);

    this.handleFileChange = this.handleFileChange.bind(this);
    this.upload = this.upload.bind(this);
    this.onWizardNext = this.onWizardNext.bind(this);
    this.onWizardPrev = this.onWizardPrev.bind(this);
    this.handleBasicFormSubmit = this.handleBasicFormSubmit.bind(this);
    this.fileManager = new FileManager();
  }

  handleFileChange() {
    let fileElement = document.getElementById('file');
    if(!fileElement) {
      return;
    }

    let file: File = (fileElement as any).files[0];

    //Everytime the file changes we need to update the state(need it to get the filename)
    this.props.datasetFileChange(file);
  }

  async upload() {
    //Get the file element on the page
    let fileElement = document.getElementById('file');

    if(!fileElement) {
      return;
    }

    let file: File = (fileElement as any).files[0];

    this.props.onFileUpload(file);
  }

  onWizardNext() {
    console.log('On wizard next');
    console.log(this.props.wizard);
    switch(this.props.wizard.currentStep) {
      case 0:
        console.log('Run Form validations');
        //this.props.submittingBasicForm();
        this.props.submitBasicInfoForm();
        return;
    }
    this.props.nextStep();
  }

  onWizardPrev() {
    console.log('On wizard prev');
    console.log(this.props.wizard);
    this.props.prevStep();
  }

  handleBasicFormSubmit(values) {
    //console.log('submitted values');
    //console.log(values);
    //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    console.log('FORM SUBMITTED BAM BAM');
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
          <div>
            <input type="file"  onChange={this.handleFileChange} accept=".json,application/json" id="file"/>
            <button type="button" onClick={this.upload}>Upload</button>
            <SchemaList schemas={this.props.file}/>
          </div>
          <PublishForm basicDetails={this.props.basicInfo}></PublishForm>
        </DatasetWizard>
      </Grid>
    </div>
  }
}

function mapStateToProps(state: any, ownProps: any) {
  let fileName = '';
  if(state.DatasetFormState.datasetFormFile) {
    fileName = state.DatasetFormState.datasetFormFile.name;
  }
  console.log('Map state to props');
  console.log(state);
  return {
    file: Object.assign([],state.FileState[fileName]),
    wizard: state.DatasetFormState.wizard,
    basicInfo: basicInfo(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onFileUpload: (file: File) => dispatch({ type: "FILE_UPLOADED", file: file }),
    datasetFileChange: (file: File) => dispatch(datasetFileChange(file)),
    nextStep: () => dispatch(nextStep()),
    prevStep: () => dispatch(prevStep()),
    submitBasicInfoForm: () => dispatch(submit('contact'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetManager);
