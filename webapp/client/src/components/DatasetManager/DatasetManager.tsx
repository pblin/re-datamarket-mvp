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
import {PublishForm} from "./DatasetWizard/PublishForm";
import {basicInfo, schemaSelector} from "../../store/datasetForm/datasetFormSelectors";
import {SchemaUpload} from "./DatasetWizard/SchemaUpload";
import {getFileState} from "../../store/file/fileSelectors";
import {uploadSchema} from "../Util/SchemaValidator";
import {isProfileSet, profileSelector} from "../../store/profile/profileSelector";
import {withRouter} from "react-router";
import {changeDialogState} from "../../store/marketplace/marketplaceActions";
import {datasetDialogSelector} from "../../store/marketplace/marketplaceSelectors";
import SchemaList from "./SchemaList/SchemaList";

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
    this.update = this.update.bind(this);
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
      case 0:
        this.props.submitBasicInfoForm();
        return;
      case 1:
        if(!this.props.schema.length) {
          this.props.shouldDisplayNoSchemaError(true);
          return;
        }
        break;
      case 3:
        if(this.props.datasetDialog.mode == 'add') {
          this.publish();
        } else {
          this.update();
        }
        return;
    }
    this.props.nextStep();
  }

  publish() {
    this.props.publishSchema(this.props.basicInfo, this.props.schema, this.props.profile.id);
  }

  update() {
    this.props.updateDataset(this.props.basicInfo, this.props.schema, this.props.profile.id, this.props.datasetDialog.dataset.id);
  }

  onWizardPrev() {
    this.props.prevStep();
  }

  handleBasicFormSubmit(values) {
    this.props.nextStep();
  }

  renderTitle(value: string) {
    if(!value) {
      return (<span>Next</span>);
    }
    return (<span>{value}</span>)
  }

  handleClose() {
    this.props.changeDialogState(false);
    this.props.resetForm();
    this.props.destroyBasic();
  }

  handleEnter() {
    console.log('Entering Modal');
    console.log(this.props.datasetDialog);
    if(this.props.datasetDialog.dataset) {
      this.props.updateDatasetForm(this.props.datasetDialog.dataset);
      console.log(this.props.datasetDialog.dataset);
    }
  }

  render() {
      return <div>
        <Dialog
          open={this.props.datasetDialog.open}
          fullWidth={true}
          maxWidth={"md"}
          onEnter={this.handleEnter}
          onClose={this.handleClose}
        >
          <DialogTitle>
            <p className={"dialog-header"}>
              <span className={"bold"}>CREATE</span> A DATASET
            </p>
            <p  className={"dialog-subheader"}>
              Fill out this form to publish a new dataset to the marketplace.
            </p>
          </DialogTitle>
          <DialogContent>
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
                  onSchemaSelect={this.onSchemaSelect}
                  schemaFile={this.props.schemaFile}
                  errors={this.props.schemaFile.errors}
                  schema={this.props.schema}
                  displayNoSchemaError={this.props.displaySchemaError}
                />
                <SchemaList schemas={this.props.schema} onSchemaSelect={this.onSchemaSelect}></SchemaList>
                <PublishForm
                  basicDetails={this.props.basicInfo}
                  schema={this.props.schema}
                  schemaPublishedId={this.props.datasetForm.schemaPublishedId}
                  schemaPublished={this.props.datasetForm.schemaPublished}>
                </PublishForm>
              </DatasetWizard>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container={true} justify={'flex-end'}>
              {this.props.wizard.currentStep != 0 &&
                <Button onClick={this.onWizardPrev} variant="contained" color="primary" className={"wizard-button"}>
                  Previous
                </Button>
              }
              {(this.props.wizard.currentStep != 3 || (this.props.wizard.currentStep == 3 && !this.props.datasetForm.schemaPublished))  &&
                <Button onClick={this.onWizardNext} variant="contained" color="primary" className={"wizard-button"}>
                  {this.renderTitle(this.props.wizard.steps[this.props.wizard.currentStep].nextButtonValue)}
                </Button>
              }
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
    datasetForm: state.DatasetFormState
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onFileUpload: (fileId: string) => dispatch({ type: "FILE_UPLOADED", fileId: fileId, validator: uploadSchema, callbackAction: 'LOAD_SCHEMA_LIST' }),
    onFileChangeAndUpload: (file: any, fileId: string) => dispatch({type: "FILE_CHANGED_AND_UPLOADED", validator: uploadSchema, callbackAction: 'LOAD_SCHEMA_LIST', file, fileId}),
    publishSchema: (basicInfo: any, schema: any[], id: any) => dispatch({type: "DATASET_FORM_PUBLISHED", basicInfo, schema, id}), //TODO: Refactor to publish dataset
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
