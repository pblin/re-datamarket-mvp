import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeMoreOptionMenu, getDatasetInfo, updateDatasetInfo} from "../../store/datasetInfo/datasetInfoActions";
import {
  canPublish,
  datasetInfoSelector,
  datasetSelector,
  isOwner,
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
  }

  pageId: string;
  toolbarOptions: ToolbarOption[] = [
    new ToolbarOption('Schema', 'schema')
  ];

  buyDataset() {
    //Add buy dataset code here
  }

  getSampleData() {
    //Add get sample data here
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
          onSave={this.saveDataset}
          onPublish={this.publishDataset}
          canPublish={this.props.canPublish}
        />
        <Grid container justify={"center"}>
          <div className={"app-section-wrapper-90"}>
            <Grid container spacing={16}>
              <Grid item xs={12} sm={4}>
                  <BasicInfoCard
                    dataset={this.props.dataset}
                    onMoreOptions={this.onMoreOptionsMenuChange}
                    isMoreOptionsOpened={this.props.datasetInfo.moreOptionsOpened}
                    onBuy={this.buyDataset}
                    onGetSampleData={this.getSampleData}
                    mode={this.props.isOwner ? 'owner': 'public'}
                    onUpdate={this.onUpdate}
                  />
              </Grid>
              <Grid item xs={12} sm={8}>
                <SchemaList
                  schemas={this.props.schema}
                  onSchemaChange={this.onSchemaChange}
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
    canPublish: canPublish(state)
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

