import * as React from "react";
import {connect} from "react-redux";
import {changeMoreOptionMenu, getDatasetInfo} from "../../store/datasetInfo/datasetInfoActions";
import {
  datasetInfoSelector,
  datasetSelector,
  isOwner,
  schemaSelector
} from "../../store/datasetInfo/datasetInfoSelector";
import SchemaList from "../DatasetManager/SchemaList/SchemaList";
import MarketplaceToolbar from "../Marketplace/MarketplaceToolbar";
import {ToolbarOption} from "../Marketplace/ToolbarOption";
import {
  Grid
} from "@material-ui/core";
import "./datasetInfo.scss";
import BasicInfoCard from "./BasicInfoCard";
import {submit} from 'redux-form';
import {changeSchema, updateDataset} from "../../store/datasetInfo/datasetInfoActions";

interface ComponentProps {
  match: any;
  getDatasetInfo: any;
  dataset: any;
  schema: any;
  isOwner: boolean;
  datasetInfo: any;
  changeMoreOptionsMenu: any;
  submitBasicInfoForm: any;
  changeSchema: any;
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
    this.props.getDatasetInfo(this.pageId);
  }

  onMenuChange() {}

  onUpdate() {
  }

  onMoreOptionsMenuChange(isOpen) {
    this.props.changeMoreOptionsMenu(isOpen);
  }

  saveBasicInfo() {
    console.log('Save basic info called');
    this.props.submitBasicInfoForm();
  }

  handleBasicFormSubmit() {
    console.log('Basic Form Submitted');
  }

  onSchemaChange(value, field, index) {
    console.log('Schema is changing', value, field, index);
    this.props.changeSchema(value, field, index);
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
      </div>
    )
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    dataset: datasetInfoSelector(state),
    datasetInfo: datasetSelector(state),
    schema: schemaSelector(state),
    isOwner: isOwner(state)
  }
}

//TODO: Write update dataset action creator
function mapDispatchToProps(dispatch: any) {
  return {
    getDatasetInfo: (datasetId: string) => dispatch(getDatasetInfo(datasetId)),
    changeMoreOptionsMenu: (isOpen) => dispatch(changeMoreOptionMenu(isOpen)),
    submitBasicInfoForm: () => dispatch(submit('contact')),
    changeSchema: (val, field, index) => dispatch(changeSchema(val, field, index)),
    updateDataset: (basicInfo, schema, ownerId, datasetId, stage) =>
      dispatch(updateDataset(basicInfo, schema, ownerId, datasetId, stage))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetInfo);

