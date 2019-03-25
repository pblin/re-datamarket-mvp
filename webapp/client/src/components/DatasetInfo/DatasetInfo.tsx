import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeMoreOptionMenu, getDatasetInfo, updateDatasetInfo} from "../../store/datasetInfo/datasetInfoActions";
import {
  canPublish,
  datasetInfoSelector,
  datasetSelector,
  isOwner, isPublished,
  schemaSelector
} from "../../store/datasetInfo/datasetInfoSelector";
import SchemaList from "../DatasetManager/SchemaList/SchemaList";
import MarketplaceToolbar from "../Marketplace/MarketplaceToolbar";
import {ToolbarOption} from "../Marketplace/ToolbarOption";
import { Grid } from "@material-ui/core";
import "./datasetInfo.scss";
import BasicInfoCard from "./BasicInfoCard";
import {submit} from 'redux-form';
import {changeSchema, updateDataset, changeBasicInfoForm} from "../../store/datasetInfo/datasetInfoActions";
import {profileSelector} from "../../store/profile/profileSelector";
import {DATASET_STAGE} from "../Common/CommonTypes";
import {withSnackbar} from "notistack";
import BasicInfoModal from "./BasicInfoFormCard";
import BasicInfoOwnerCard from './BasicInfoOwnerCard';
// payment and sample
import StripeCheckout from 'react-stripe-checkout';
//import axios from 'axios';
import {STRIPETOKEN, /*STRIPECHECKOUT */} from '../ConfigEnv';
/*import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';*/

interface ComponentProps {
  match: any;
  dataset: any;
  schema: any;
  isOwner: boolean;
  datasetInfo: any;
  submitBasicInfoForm: any;
  profile: any;
  enqueueSnackbar: any;
  action: any;
  canPublish: boolean;
  isPublished: boolean;
}

class DatasetInfo extends React.Component<ComponentProps> {
  constructor(props: any) {
    super(props);

    this.onMoreOptionsMenuChange = this.onMoreOptionsMenuChange.bind(this);
    this.buyDataset = this.buyDataset.bind(this);
    this.getSampleData = this.getSampleData.bind(this);
    this.saveBasicInfo = this.saveBasicInfo.bind(this);
    this.handleBasicFormSubmit = this.handleBasicFormSubmit.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onSchemaChange = this.onSchemaChange.bind(this);
    this.saveDataset = this.saveDataset.bind(this);
    this.publishDataset = this.publishDataset.bind(this);
    this.unpublishDataset = this.unpublishDataset.bind(this);
  }

  pageId: string;
  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('Schema', 'schema')
  ];

  onToken = token => {
    const body = {
      amount: this.props.dataset.price_high,
      description:this.props.dataset.description,
      product: this.props.dataset.id,
      stripeTokenType: token.type,
      stripeEmail: token.email,
      stripeToken: token.id,
      token: token
  };
    console.log(body);
  /*axios
      .post(STRIPECHECKOUT, body)
      .then(response => {
        console.log(response);
        alert("Payment OK");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });*/
  };
  buyDataset() {
    const publishableKey = STRIPETOKEN;
      let chargeAmount = this.props.dataset.price_high;
      console.log(chargeAmount);      
     
      return (
          <StripeCheckout
              name="Rebloc"
              description={this.props.dataset.description}
              panelLabel="Pay {{chargeAmount}}" 
              amount={chargeAmount} //Amount in cents $9.99
              token={this.onToken}
              label="Pay with 💳"
              locale="auto"
              stripeKey={publishableKey}
              image="https://www.rebloc.io/img/favicon.png" //Pop-in header image
              billingAddress={false}
          />
      );
  }

  getSampleData() {
    /*return (
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Dowload Sample Data"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Download encrypted sample data zip file from {this.props.dataset.access_url}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );*/
  }

  componentWillMount(): void {
    this.pageId = this.props.match.params.id;
    this.props.action.getDatasetInfo(this.pageId);
  }

  onMenuChange() {}

  onUpdate() {
    this.props.action.changeBasicInfoForm(true);
  }

  onMoreOptionsMenuChange(isOpen) {
    this.props.action.changeMoreOptionMenu(isOpen);
  }

  saveBasicInfo() {
    console.log('Save basic info called');
    this.props.submitBasicInfoForm();
  }

  handleBasicFormSubmit(values) {
    console.log('Basic Form Submitted');
    console.log(values);
    this.props.action.updateDatasetInfo(values);
    this.props.action.changeBasicInfoForm(false);
  }

  onSchemaChange(value, field, index) {
    this.props.action.changeSchema(value, field, index);
  }

  saveDataset() {
    console.log('Saving the dataset');
    this.props.action.updateDataset(
      this.props.dataset,
      this.props.schema,
      this.props.profile.id,
      this.props.dataset.id,
      DATASET_STAGE.SAVED,
      this.props.enqueueSnackbar,
      `The Dataset was saved successfully`
    )
  }

  publishDataset() {
    this.props.action.updateDataset(
      this.props.dataset,
      this.props.schema,
      this.props.profile.id,
      this.props.dataset.id,
      DATASET_STAGE.PUBLISHED,
      this.props.enqueueSnackbar,
      `The Dataset was published successfully`
    )
  }

  unpublishDataset() {
    this.props.action.updateDataset(
      this.props.dataset,
      this.props.schema,
      this.props.profile.id,
      this.props.dataset.id,
      DATASET_STAGE.SAVED,
      this.props.enqueueSnackbar,
      `The Dataset was un-published successfully`
    )
  }

  render() {
    console.log(this.props.dataset);
    return (
      <div className={"dataset-info-view"}>
        {/*TODO: ADD buy button and sample data button here*/}
        <MarketplaceToolbar
          toolbarOptions={this.toolbarOptions}
          onSchemaFilterChange={this.onMenuChange}
          schemaFilter={'schema'}
          hasPublish={this.props.isOwner}
          isPublished={this.props.isPublished}
          onSave={this.saveDataset}
          onPublish={this.publishDataset}
          canPublish={this.props.canPublish}
          unPublish={this.unpublishDataset}
        />
        <Grid container justify={"center"}>
          <div className={"app-section-wrapper-90"}>
            <Grid container spacing={16}>
              <Grid item xs={12} sm={4}>
                {this.props.isOwner &&
                  <BasicInfoOwnerCard
                    dataset={this.props.dataset}
                    onUpdate={this.onUpdate}
                    isPublished={this.props.isPublished}
                  />
                }
                {!this.props.isOwner &&
                  <BasicInfoCard
                    dataset={this.props.dataset}
                    onMoreOptions={this.onMoreOptionsMenuChange}
                    isMoreOptionsOpened={this.props.datasetInfo.moreOptionsOpened}
                    onBuy={this.buyDataset}
                    onGetSampleData={this.getSampleData}
                    mode={this.props.isOwner ? 'owner': 'public'}
                    onUpdate={this.onUpdate}
                  />
                }
              </Grid>
              <Grid item xs={12} sm={8}>
                <SchemaList
                  schemas={this.props.schema}
                  onSchemaChange={this.onSchemaChange}
                  canEdit={(!this.props.isPublished && this.props.isOwner)}
                  allowUpload={(!this.props.isPublished && this.props.isOwner)}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <BasicInfoModal
          onSave={this.saveBasicInfo}
          onSubmit={this.handleBasicFormSubmit}
          isOpen={this.props.datasetInfo.isBasicFormOpen}
          onCancel={() => this.props.action.changeBasicInfoForm(false)}
        />
      </div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
  console.log('can publish');
  console.log(state);
  console.log(canPublish(state));
  return {
    dataset: datasetInfoSelector(state),
    datasetInfo: datasetSelector(state),
    schema: schemaSelector(state),
    isOwner: isOwner(state),
    profile: profileSelector(state),
    canPublish: canPublish(state),
    isPublished: isPublished(state)
  }
}

//TODO: Write update dataset action creator
function mapDispatchToProps(dispatch: any) {
  return {
    submitBasicInfoForm: () => dispatch(submit('contact')),
    action: bindActionCreators(
      {
        getDatasetInfo,
        changeMoreOptionMenu,
        updateDataset,
        updateDatasetInfo,
        changeBasicInfoForm,
        changeSchema
      }, dispatch)
  };
}
//@ts-ignore
DatasetInfo = withSnackbar(DatasetInfo);
export default connect(mapStateToProps, mapDispatchToProps)(DatasetInfo);

