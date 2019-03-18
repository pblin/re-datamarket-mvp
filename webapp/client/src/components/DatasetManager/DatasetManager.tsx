import * as React from "react";
import {connect} from "react-redux";
import {DatasetWizard} from "./DatasetWizard/DatasetWizard";
import {
  changeDisplaySchemaError,
  nextStep,
  prevStep, resetForm, updateDataset, updateDatasetForm,
} from "../../store/datasetForm/actions";
import BasicInfoFrom from './DatasetWizard/BasicInfoForm';
import { submit, destroy } from 'redux-form';
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import {basicInfo, getWizardSteps, schemaSelector} from "../../store/datasetForm/datasetFormSelectors";
import {SchemaUpload} from "./DatasetWizard/SchemaUpload";
import {getFileState} from "../../store/file/fileSelectors";
import {uploadSchema} from "../Util/SchemaValidator";
import {isProfileSet, profileSelector} from "../../store/profile/profileSelector";
import {withRouter} from "react-router";
import {changeDialogState} from "../../store/marketplace/marketplaceActions";
import {datasetDialogSelector} from "../../store/marketplace/marketplaceSelectors";
import SchemaList from "./SchemaList/SchemaList";
import {DATASET_STAGE} from "../Common/CommonTypes";

interface ComponentProps {
  file: any[],
  fileName: string,
  datasetFileChange: any,
  onFileUpload: any,
  onFileChangeAndUpload: any,
  submitBasicInfoForm: any,
  submittingBasicForm: any,
  updateBasicInfo: any,
  wizard: any,
  basicInfo: any,
  nextStep: any,
  prevStep: any,
  schemaFile: any,
  schema: any[],
  noSchemaError: any;
  shouldDisplayNoSchemaError: any;
  displaySchemaError: boolean;
  publishSchema: any;
  profile: any;
  getProfile: any;
  isProfileSet: boolean;
  history: any;
  changeDialogState: any;
  datasetDialog: any;
  datasetForm: any;
  updateDatasetForm: any;
  resetForm: any;
  updateDataset: any;
  destroyBasic: any;
  steps: any[];
}

class DatasetManager extends React.Component<ComponentProps> {
  constructor(props: any) {
    super(props);
    this.onWizardNext = this.onWizardNext.bind(this);
    this.onWizardPrev = this.onWizardPrev.bind(this);
    this.handleBasicFormSubmit = this.handleBasicFormSubmit.bind(this);
    this.onSchemaFileChange = this.onSchemaFileChange.bind(this);
    this.onSchemaUpload = this.onSchemaUpload.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.cleanup = this.cleanup.bind(this);
  }

  onSchemaFileChange(fileId: string, file: File) {
    if(this.props.displaySchemaError) {
      this.props.shouldDisplayNoSchemaError(false);
    }
    this.props.onFileChangeAndUpload(file, fileId);
  }

  onSchemaSelect(e:any) {
    //this.props.changeSchema(name,field,value);
    console.log(e);
  }

  onSchemaUpload(fileId: string) {
    this.props.onFileUpload(fileId);
  }

  onWizardNext() {
    switch(this.props.wizard.currentStep) {
      case 2:
        this.props.submitBasicInfoForm();
        return;
      case 0:
        if(!this.props.schema.length) {
          this.props.shouldDisplayNoSchemaError(true);
          return;
        }
        break;
      case 3:
        this.publish();
        return;
    }
    this.props.nextStep();
  }

  publish() {
    this.props.publishSchema(this.props.basicInfo, this.props.schema, this.props.profile.id, DATASET_STAGE.SAVED);
  }

  onWizardPrev() {
    this.props.prevStep();
  }

  handleBasicFormSubmit(values) {
    this.publish();
  }

  renderTitle(value: string) {
    if(!value) {
      return (<span>Next</span>);
    }
    return (<span>{value}</span>)
  }

  handleClose() {
    this.props.changeDialogState(false);
  }

  cleanup() {
    this.props.resetForm();
    this.props.destroyBasic();
  }

  handleEnter() {
    if(this.props.datasetDialog.dataset) {
      let dataset = Object.assign({}, this.props.datasetDialog.dataset);
      if(Array.isArray(dataset['search_terms'])) {
        dataset['search_terms'] = dataset['search_terms'].join(',')
      }
      this.props.updateDatasetForm(dataset);
    }
  }

  renderBasicInfoForm() {
    return <BasicInfoFrom onSubmit={this.handleBasicFormSubmit}/>
  }

  renderSchemaUpload() {
    return <SchemaUpload
      onSchemaFileChange={this.onSchemaFileChange}
      onSchemaUpload={this.onSchemaUpload}
      onSchemaSelect={this.onSchemaSelect}
      schemaFile={this.props.schemaFile}
      errors={this.props.schemaFile.errors}
      schema={this.props.schema}
      displayNoSchemaError={this.props.displaySchemaError}
    />;
  }

  renderSchemaList() {
      return <SchemaList schemas={this.props.schema} onSchemaSelect={this.onSchemaSelect}></SchemaList>;
  }

  renderWizard() {
    if(this.props.datasetDialog.mode == 'add') {
      return <DatasetWizard
        steps={this.props.steps}
        onNext={this.onWizardNext}
        onPrev={this.onWizardPrev}
        currentStep={this.props.wizard.currentStep}
      >
        {this.renderSchemaUpload()}
        {this.renderSchemaList()}
        {this.renderBasicInfoForm()}
      </DatasetWizard>
    }
  }

  renderWizardNextButton(currentStep, length, isDatasetPublished, mode) {
      if((currentStep != length - 1) || (currentStep == length - 1 && isDatasetPublished) ) {
        if(mode == 'add') {
          return <Button onClick={this.onWizardNext} variant="contained" color="secondary" className={"wizard-button"}>
            {this.renderTitle(this.props.steps[this.props.wizard.currentStep].nextButtonValue)}
          </Button>
        }
      }
  }

  renderDialogTitle() {
      if(this.props.datasetDialog.mode == 'add') {
        return <DialogTitle>
          <p className={"dialog-header"}>
            <span className={"bold"}>CREATE</span> A DATASET
          </p>
          <p className={"dialog-subheader"}>
            Fill out this form to publish a new dataset to the marketplace.
          </p>
        </DialogTitle>
      }
  }

  render() {
      return <div>
        <Dialog
          open={this.props.datasetDialog.open}
          fullWidth={true}
          maxWidth={"md"}
          onEnter={this.handleEnter}
          onExited={this.cleanup}
          onClose={this.handleClose}
        >
          {this.renderDialogTitle()}
          <DialogContent>
            <Grid container={true}>
              {this.renderWizard()}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container={true} justify={'flex-end'}>
              {this.props.wizard.currentStep != 0 &&
                <Button onClick={this.onWizardPrev} variant="contained" color="secondary" className={"wizard-button"}>
                  Previous
                </Button>
              }
              {this.renderWizardNextButton(this.props.wizard.cuurentStep, this.props.steps.length, this.props.datasetForm.datasetPublished, this.props.datasetDialog.mode)}
              <Button onClick={this.handleClose} className={"cancel-btn"}>
                Cancel
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
  }
}

function mapStateToProps(state: any, ownProps: any) {
        console.log(state);
  return {
    schemaFile: Object.assign({}, getFileState(state).files.find(file => file.fileId == 'schemaFile')),
    wizard: state.DatasetFormState.wizard,
    basicInfo: basicInfo(state),
    schema: Object.assign([], schemaSelector(state)),
    displaySchemaError: state.DatasetFormState.displayNoSchemaError,
    profile: profileSelector(state),
    isProfileSet: isProfileSet(state),
    datasetDialog: datasetDialogSelector(state),
    datasetForm: state.DatasetFormState,
    steps: getWizardSteps(state),
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onFileUpload: (fileId: string) => dispatch({ type: "FILE_UPLOADED", fileId: fileId, validator: uploadSchema, callbackAction: 'LOAD_SCHEMA_LIST' }),
    onFileChangeAndUpload: (file: any, fileId: string) => dispatch({type: "FILE_CHANGED_AND_UPLOADED", validator: uploadSchema, callbackAction: 'LOAD_SCHEMA_LIST', file, fileId}),
    publishSchema: (basicInfo: any, schema: any[], id: any, stage: DATASET_STAGE) => dispatch({type: "DATASET_FORM_PUBLISHED", basicInfo, schema, id, stage}),
    updateDataset: (basicInfo: any, schema: any[], ownerId: any, datasetId: any) => dispatch(updateDataset(basicInfo, schema, ownerId, datasetId)),
    nextStep: () => dispatch(nextStep()),
    prevStep: () => dispatch(prevStep()),
    submitBasicInfoForm: () => dispatch(submit('contact')),
    shouldDisplayNoSchemaError: (shouldDisplay: boolean) => dispatch(changeDisplaySchemaError(shouldDisplay)),
    changeDialogState: (isOpen: boolean) => dispatch(changeDialogState(isOpen)),
    updateDatasetForm: (dataset: any) => dispatch(updateDatasetForm(dataset)),
    resetForm: () => dispatch(resetForm()),
    destroyBasic: () => dispatch(destroy('contact'))
  };
}
export default withRouter(
   connect(mapStateToProps, mapDispatchToProps)(DatasetManager)
);
