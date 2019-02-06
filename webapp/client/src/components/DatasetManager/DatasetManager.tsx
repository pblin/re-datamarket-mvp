import * as React from "react";
import {connect} from "react-redux";
import {FileManager} from "../../services/FileManager";
import {DatasetWizard} from "./DatasetWizard/DatasetWizard";
import {
  nextStep,
  prevStep,
  datasetFileChange,
  onBasicFormSubmitted,
  updateBasicInfo,
  submittingBasicForm
} from "../../store/datasetForm/actions";
import SchemaList from './SchemaList/SchemaList';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {BasicInfo} from "./DatasetWizard/BasicInfo"
import {getBasicInfo} from "../../store/datasetForm/dataFormSelectors";

interface ComponentProps {
  file: any[];
  fileName: string;
  datasetFileChange: any;
  onFileUpload: any;
  submitBasicForm: any;
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
    this.handleBasicFormChange = this.handleBasicFormChange.bind(this);
    this.onBasicFormSubmit = this.onBasicFormSubmit.bind(this);
    this.fileManager = new FileManager();
  }

  onBasicFormSubmit(inputs: any[]) {
    console.log('Basic form Submitted');
    console.log(inputs);
    this.props.submitBasicForm(inputs);
  }

  componentDidUpdate(test) {
    console.log('COMPONENT UPDATED');
    console.log(test);
    console.log(this.props.basicInfo);
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

  handleBasicFormChange(key: string, val: any, isValid: boolean ) {
    console.log('Basic form change');
    console.log(key, val, isValid);
    this.props.updateBasicInfo(key, val, isValid)
  }

  shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<{}>): boolean {
    console.log('Manager');
    console.log(nextProps);
    console.log(nextState)
    console.log(this.props.basicInfo);
    //return nextProps.submitted == false;
    //return this.props.basicInfo.submitted !=
    //return nextProps.basicInfo.submitting != true;
    return true;
  }

  onWizardNext() {
    console.log('On wizard next');
    console.log(this.props.wizard);
    switch(this.props.wizard.currentStep) {
      case 0:
        console.log('Run Form validations');
        this.props.submittingBasicForm();
        return;
    }
    this.props.nextStep();
  }

  onWizardPrev() {
    console.log('On wizard prev');
    console.log(this.props.wizard);
    this.props.prevStep();
  }

  render() {
    return <div>
      <h1>Create Schema Form</h1>
      <DatasetWizard
        steps={this.props.wizard.steps}
        onNext={this.onWizardNext}
        onPrev={this.onWizardPrev}
        currentStep={this.props.wizard.currentStep}
      >
        <BasicInfo
          onFormChange={this.handleBasicFormChange}
          basicInfo={this.props.basicInfo}
          submitting={this.props.basicInfo.submitting}
          submitted={this.props.basicInfo.submitted}
          onSubmit={this.onBasicFormSubmit}
        />
        <div>
          <input type="file"  onChange={this.handleFileChange} accept=".json,application/json" id="file"/>
          <button type="button" onClick={this.upload}>Upload</button>
          <SchemaList schemas={this.props.file}/>
        </div>
        <div> Here</div>
      </DatasetWizard>

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
    basicInfo: getBasicInfo(state)
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onFileUpload: (file: File) => dispatch({ type: "FILE_UPLOADED", file: file }),
    datasetFileChange: (file: File) => dispatch(datasetFileChange(file)),
    updateBasicInfo: (key: string, val: any, isValid: boolean) => dispatch(updateBasicInfo(key,val,isValid)),
    nextStep: () => dispatch(nextStep()),
    prevStep: () => dispatch(prevStep()),
    submittingBasicForm: () => dispatch(submittingBasicForm()),
    submitBasicForm: (inputs) => dispatch(onBasicFormSubmitted(inputs))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetManager);
