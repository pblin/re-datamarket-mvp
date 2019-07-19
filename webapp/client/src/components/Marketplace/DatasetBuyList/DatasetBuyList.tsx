import * as React from 'react';
import {
  Collapse,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  //Slide,
  withStyles
} from "@material-ui/core";

//Icons
import ExpandMore from "@material-ui/icons/ExpandMore";
import TablePaginationActions from "./TablePaginationActions";

interface ComponentProps {
  datasets: any[],
  classes: any
}
interface ComponentState {
  datasetDialogOpen: boolean
}

const styles = {
  overlay: {
    position: 'absolute' as 'absolute',
    backgroundColor: 'blue',
    top: 0,
    right: 0,
    height: 100,
    width: '50%'
  },
  table: {
    position: 'relative' as 'relative'
  },
  dataRow: {
    border: 'none',
    '& td': {
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none'
    }
  },
  card: {
    border: "1px solid black"
  }
};

class DatasetBuyList extends React.Component<ComponentProps, ComponentState>{
  constructor(props) {
    super(props);
    this.state = {
      datasetDialogOpen: false
    }
  }

  render() {
    const {datasets, classes} = this.props;
    //const {datasetDialogOpen} = this.state;
    //const tableGridSize = datasetDialogOpen ? 8: 12;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Last Modified</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datasets.map((dataset) => (
                  <React.Fragment>
                    <TableRow
                      className={classes.dataRow}
                      onClick={() => this.setState({datasetDialogOpen: !this.state.datasetDialogOpen})}
                    >
                      <TableCell>
                        {dataset.name}
                      </TableCell>
                      <TableCell>
                        {dataset['date_modified']}
                      </TableCell>
                      <TableCell>
                        {dataset['price_high']}
                      </TableCell>
                      <TableCell>
                        <ExpandMore/>
                      </TableCell>
                    </TableRow>
                    <Collapse in={this.state.datasetDialogOpen}>
                      <div>Test Data</div>
                    </Collapse>
                  </React.Fragment>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    onChangePage = {() => {}}
                    page={0}
                    rowsPerPage={10}
                    ActionsComponent={TablePaginationActions}
                    colSpan={3}
                    count={datasets.length}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
};

export default withStyles(styles)(DatasetBuyList);
