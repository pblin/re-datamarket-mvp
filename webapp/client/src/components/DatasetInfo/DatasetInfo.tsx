import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  changeBasicInfoForm,
  changeBuyDatasetDialog,
  changeMoreOptionMenu,
  changeSampleDialog,
  changeSchema,
  changeUploadDialog,
  getDatasetInfo,
  updateDataset,
  updateDatasetInfo
} from "../../store/datasetInfo/datasetInfoActions";
import {
  canPublish,
  datasetInfoSelector,
  datasetSelector,
  isOwner,
  isPublished,
  schemaSelector
} from "../../store/datasetInfo/datasetInfoSelector";
import SchemaList from "../DatasetManager/SchemaList/SchemaList";
import MarketplaceToolbar from "../Marketplace/MarketplaceToolbar";
import {ToolbarOption} from "../Marketplace/ToolbarOption";
import {Grid} from "@material-ui/core";
import "./datasetInfo.scss";
import BasicInfoCard from "./BasicInfoCard";
import {submit} from 'redux-form';
import {profileSelector} from "../../store/profile/profileSelector";
import {DATASET_STAGE} from "../Common/CommonTypes";
import {withSnackbar} from "notistack";
import BasicInfoModal from "./BasicInfoFormCard";
import BasicInfoOwnerCard from './BasicInfoOwnerCard';
import SampleDataDialog from "./SampleDataDialog";
import BuyDatasetDialog from "./BuyDatasetDialog";

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
    this.updateDataset = this.updateDataset.bind(this);
  }

  pageId: string;
  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('Schema', 'schema')
  ];

  buyDataset() {
    this.props.action.changeBuyDatasetDialog(true);
  }

  getSampleData() {
    this.props.action.changeSampleDialog(true);
  }

  componentWillMount(): void {
    this.pageId = this.props.match.params.id;
    this.props.action.getDatasetInfo(this.pageId);
  }

  onUpdate() {
    this.props.action.changeBasicInfoForm(true);
  }

  onMoreOptionsMenuChange(isOpen) {
    this.props.action.changeMoreOptionMenu(isOpen);
  }

  saveBasicInfo() {
    this.props.submitBasicInfoForm();
  }

  handleBasicFormSubmit(values) {
    this.props.action.updateDatasetInfo(values);
    this.props.action.changeBasicInfoForm(false);
  }

  onSchemaChange(value, field, index) {
    this.props.action.changeSchema(value, field, index);
  }

  updateDataset(type: DATASET_STAGE, message: string) {
    this.props.action.updateDataset(
      this.props.dataset,
      this.props.schema,
      this.props.profile.id,
      this.props.dataset.id,
      type,
      this.props.enqueueSnackbar,
      message
    )
  }

  saveDataset() {
    this.updateDataset(DATASET_STAGE.SAVED,`The Dataset was saved successfully` );
  }

  publishDataset() {
    this.updateDataset(DATASET_STAGE.PUBLISHED,`The Dataset was published successfully` );
  }

  unpublishDataset() {
    this.updateDataset( DATASET_STAGE.SAVED,   `The Dataset was un-published successfully`);
  }

  render() {
    return (
      <div className={"dataset-info-view"}>
        <MarketplaceToolbar
          toolbarOptions={this.toolbarOptions}
          onSchemaFilterChange={() => {}}
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
                  />
                }
              </Grid>
              <Grid item xs={12} sm={8}>
                <SchemaList
                  schemas={this.props.schema}
                  onSchemaChange={this.onSchemaChange}
                  schemaName={this.props.dataset.table_name}
                  canEdit={(!this.props.isPublished && this.props.isOwner)}
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
        <SampleDataDialog
          isOpen={this.props.datasetInfo.isSampleDataOpen}
          onCancel={() => this.props.action.changeSampleDialog(false)}
          accessUrl={this.props.dataset['access_url']}
        />
        <BuyDatasetDialog
          isOpen={this.props.datasetInfo.isBuyDatasetOpen}
          user={this.props.profile}
          dataset={this.props.dataset}
          onCancel={() => this.props.action.changeBuyDatasetDialog(false)}
        />
      </div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
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
        changeSchema,
        changeUploadDialog,
        changeSampleDialog,
        changeBuyDatasetDialog
      }, dispatch)
  };
}
//@ts-ignore
DatasetInfo = withSnackbar(DatasetInfo);
export default connect(mapStateToProps, mapDispatchToProps)(DatasetInfo);

