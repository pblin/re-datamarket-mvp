import * as React from "react";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {
  Grid,
  Button,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Theme,
  withStyles
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterIcon from "@material-ui/icons/FilterList";
import JumboPaper from "../../Common/jumboPaper";
import TypographyList from "../../Marketplace/DatasetBuyList/TypographyList";
//import Moment from 'moment';

//import appVars from "../../../styles/appVars";

const styles = (theme: Theme) => ({
  summaryPanel: {
    '&:hover': {
      cursor: 'default'
    },
    cursor: 'default !important'
  },
  headerPanel: {
    border: 'none',
    boxShadow: 'none'
  },
  title: {
    fontWeight: 'bold' as 'bold'
  }
});

interface ComponentProps {
  schemaFields: any[];
  history: any;
  onFilter: any;
  classes: any;
}
interface ComponentState {}

class SchemaFieldTable extends React.Component<ComponentProps, ComponentState>{
  handleClick = (dataset) => {
    this.props.history.push(`/dataset/${dataset.id}`);
  };

  render() {
    const {schemaFields, onFilter, classes, history} = this.props;

    return(
      <div>
        {schemaFields.length == 0 && <JumboPaper
          title={"No results found"}
          content={"No Results Found for the selected filters. Please try applying different filters."}
          buttonText={"Change Filters"}
          handleClick={onFilter}
        />}
        {schemaFields.length > 0 &&
        <React.Fragment>
          <ExpansionPanel expanded={false} className={classes.headerPanel}>
            <ExpansionPanelSummary
              className={classes.summaryPanel}
              expandIcon={<FilterIcon onClick={onFilter} className={classes.filter}/>}
            >
              <Grid container>
                <Grid item xs={3}>Field Name</Grid>
                <Grid item xs={3}>Description</Grid>
                <Grid item xs={3}>Categories</Grid>
                <Grid item xs={3}>Dataset</Grid>
              </Grid>
            </ExpansionPanelSummary>
          </ExpansionPanel>
          {schemaFields.map((schemaField, index) => (
            <ExpansionPanel key={`schema${index}`} className={"schema-panel"}>
              <ExpansionPanelSummary className={"schema-list"} expandIcon={<ExpandMoreIcon/>}>
                <Grid container={true} justify={"flex-start"} className={"no-pad-right"}>
                  <Grid item xs={3}>
                    <Typography className={"header"} variant={"subtitle1"}>{schemaField.field_name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{schemaField.field_description}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TypographyList terms={schemaField.topic} limit={3}/>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className={"header"} variant={"subtitle1"}>{schemaField.dataset_name}</Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={1}>
                  <Grid item xs={3}><Typography className={classes.title}>Description</Typography></Grid>
                  <Grid item xs={9}><Typography>{schemaField.field_description}</Typography></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>Database Field Name</Typography></Grid>
                  <Grid item xs={9}><Typography>{schemaField.field_name}</Typography></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>Country</Typography></Grid>
                  <Grid item xs={9}><Typography>{schemaField.country}</Typography></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>State/Province</Typography></Grid>
                  <Grid item xs={9}><Typography>{schemaField.state_province}</Typography></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>City</Typography></Grid>
                  <Grid item xs={9}><Typography>{schemaField.city.join(' ')}</Typography></Grid>
                </Grid>
              </ExpansionPanelDetails>
              <Divider/>
              <ExpansionPanelActions>
                <Grid container justify={'flex-start'}>
                  <Button
                    color={"secondary"}
                    variant={"text"}
                    className={classes.btn}
                    onClick={() => {history.push(`/dataset/${schemaField['dataset_id']}`)}}
                  >
                    View Dataset
                  </Button>
                </Grid>
              </ExpansionPanelActions>
            </ExpansionPanel>
          ))}
        </React.Fragment>
        }
      </div>
    );
  }

}

export default withStyles(styles)(SchemaFieldTable);
