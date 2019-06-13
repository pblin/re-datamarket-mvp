import {
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  Grid,
  Typography
} from "@material-ui/core";
import * as React from "react";

const DatasetList = ({datasets, handleClick}) => {
    const renderDatasetList = () => {
      return <React.Fragment>{datasets.map((dataset, index) => (
        <ExpansionPanel key={`userSchema${index}`} expanded={false}>
          <ExpansionPanelSummary className={"schema-list"}>
            <Grid container={true} justify={"flex-start"} className={"no-pad-right"}>
              <Grid item xs={6} sm={9}>
                <div className={"fake-image-own"}>
                  <p>50</p>
                </div>
                <Typography variant={"subtitle1"} className={"header"}>
                  {dataset.dataset_name}
                </Typography>
                <Typography variant={"subtitle2"} className={"sub-header"}>
                  {dataset.dataset_description} (<i>Purchased On: {dataset.order_timestamp}</i>)
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3} className={"action-container"}>
                <Grid container justify={"flex-end"}>
                  <Button
                    variant={"outlined"}
                    color={"primary"}
                    onClick={() => handleClick(dataset)}
                  >
                    View Dataset
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      ))}</React.Fragment>
    };

    return (
      <React.Fragment>{renderDatasetList()}</React.Fragment>
    )
};

export default DatasetList;
