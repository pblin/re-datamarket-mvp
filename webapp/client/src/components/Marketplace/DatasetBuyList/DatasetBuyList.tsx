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
import TypographyList from "./TypographyList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterIcon from "@material-ui/icons/FilterList";
import JumboPaper from "../../Common/jumboPaper";
import Moment from 'moment';

const styles = (theme: Theme) => ({
  headerPanel: {
    border: 'none',
    boxShadow: 'none'
  },
  summaryPanel: {
    '&:hover': {
      cursor: 'default'
    },
    cursor: 'default !important'
  },
  title: {
    fontWeight: 'bold' as 'bold'
  },
  btn: {
    marginTop: '0px'
  },
  filter: {
    '&:hover': {
      color: theme.palette.primary.dark
    }
  }
});

interface ComponentProps {
  datasets: any[];
  history: any;
  onFilter: any;
  classes: any;
}
interface ComponentState {
  searchTermsOpened: {}
}

class DatasetBuyList extends React.Component<ComponentProps, ComponentState>{
  handleClick = (dataset) => {
    this.props.history.push(`/dataset/${dataset.id}`);
  };

  render() {
    const {datasets, onFilter, classes} = this.props;

    return(
      <div>
        {datasets.length == 0 && <JumboPaper
          title={"No Results Found"}
          content={"No Results Found for the selected filters. Please try applying different filters."}
          buttonText={"Change Filters"}
          handleClick={onFilter}
        />}
        {datasets.length > 0 &&
        <React.Fragment>
          <ExpansionPanel expanded={false} className={classes.headerPanel}>
            <ExpansionPanelSummary
              className={classes.summaryPanel}
              expandIcon={<FilterIcon onClick={onFilter} className={classes.filter}/>}
            >
              <Grid container>
                <Grid item xs={7}>Dataset Name</Grid>
                <Grid item xs={2}>Tags</Grid>
                <Grid item xs={3}>Date Modified</Grid>
              </Grid>
            </ExpansionPanelSummary>
          </ExpansionPanel>
          {datasets.map((dataset, index) => (
            <ExpansionPanel key={`schema${index}`} className={"schema-panel"}>
              <ExpansionPanelSummary className={"schema-list"} expandIcon={<ExpandMoreIcon/>}>
                <Grid container={true} justify={"flex-start"} className={"no-pad-right"}>
                  <Grid item xs={7}>
                    <Typography className={"header"} variant={"subtitle1"}>{dataset.name}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <TypographyList limit={3} terms={dataset['search_terms']}/>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant={"body2"}> {Moment(dataset['date_modified']).format('MMMM Do YYYY')}</Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={1}>
                  <Grid item xs={3}><Typography className={classes.title}>Description</Typography></Grid>
                  <Grid item xs={9}><Typography>{dataset.description}</Typography></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>Number Of Records</Typography></Grid>
                  <Grid item xs={9}><Typography>{dataset['num_of_records']}</Typography></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>Country</Typography></Grid>
                  <Grid item xs={9}><Typography>{dataset['country']}</Typography></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>State/Province</Typography></Grid>
                  <Grid item xs={9}><Typography>{dataset['state_province']}</Typography></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>City</Typography></Grid>
                  <Grid item xs={9}><Typography>{dataset['city']}</Typography></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>Date Created</Typography></Grid>
                  <Grid item xs={9}><Typography>{Moment(dataset['date_created']).format('MMMM Do YYYY')}</Typography></Grid>

                  <Grid item xs={3}><Typography className={classes.title}>Date Modified</Typography></Grid>
                  <Grid item xs={9}><Typography>{Moment(dataset['date_modified']).format('MMMM Do YYYY')}</Typography></Grid>
                </Grid>
              </ExpansionPanelDetails>
              <Divider/>
              <ExpansionPanelActions>
                <Grid container justify={'flex-start'}>
                  <Button
                    color={"secondary"}
                    variant={"text"}
                    className={classes.btn}
                    onClick={() => this.handleClick(dataset)}
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

export default withStyles(styles)(DatasetBuyList);
