import * as React from "react";
import {connect} from "react-redux";
import {FileManager} from "../../services/FileManager";
import {DatasetWizard} from "./DatasetWizard/DatasetWizard";
import {nextStep, prevStep, datasetFileChange} from "../../store/datasetForm/actions";
import SchemaList from './SchemaList/SchemaList';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface ComponentProps {
  file: any[];
  fileName: string;
  datasetFileChange: any;
  onFileUpload: any;
  wizard: any,
  nextStep: any,
  prevStep: any
}

class DatasetManager extends React.Component<ComponentProps> {
  fileManager: FileManager;
  constructor(props: any, fileManager: FileManager) {
    super(props);

    //TODO: Autobind
    this.handleClick = this.handleClick.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.upload = this.upload.bind(this);
    this.onWizardNext = this.onWizardNext.bind(this);
    this.onWizardPrev = this.onWizardPrev.bind(this);
    this.fileManager = new FileManager();
  }

  componentDidMount() {
    console.log('The component did mount');
  }


  handleClick() {
    console.log('The button was clicked');
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
    this.props.nextStep();
  }

  onWizardPrev() {
    console.log('On wizard prev');
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
        <div> I am transcluded</div>
        <div>
          <input type="file"  onChange={this.handleFileChange} accept=".json,application/json" id="file"/>
          <button type="button" onClick={this.upload}>Upload</button>
          {/*this.props.file.map( (f, index) => <p key={`schema_${index}`}>{f.name}</p>)*/}
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
  console.log(state);
  return {
    file: Object.assign([],state.FileState[fileName]),
    wizard: state.DatasetFormState.wizard
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onFileUpload: (file: File) => dispatch({ type: "FILE_UPLOADED", file: file }),
    datasetFileChange: (file: File) => dispatch(datasetFileChange(file)),
    nextStep: () => dispatch(nextStep()),
    prevStep: () => dispatch(prevStep())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetManager);
