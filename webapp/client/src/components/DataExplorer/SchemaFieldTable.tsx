import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";

import * as React from "react";
import FilterBreadCrumbs from "../Common/Filter/FilterBreadCrumbs";
import Downloader from "../Common/File/Downloader";

//Icons
import FilterIcon from "@material-ui/icons/FilterList";
import InfoIcon from "@material-ui/icons/Info";


const styles = (theme: Theme) => ({
  container: {
    padding: '10px',
    overflowX: 'hidden' as 'hidden',
    overflowY: 'hidden' as 'hidden',
    position: 'relative' as 'relative',
    '&:hover': {
      overflowX: 'auto' as 'auto',
      overflowY: 'auto' as 'auto'
    }
  },
  description: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as 'nowrap',
    overflow: 'hidden',
    display: 'block',
    width: '400px'
  },
  spacer: {
    flex: '1 1 100%',
  },
  title: {
    flex: '0 0 auto',
  }
});

interface ComponentProps {
  schemaFields: any[];
  history: any;
  classes: any;
  onFilter: any;
}

interface ComponentState {
  pageNumber: number;
  rowsPerPage: number;
}

//TODO: Style
class SchemaFieldTable extends React.Component<ComponentProps, ComponentState> {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 0,
      rowsPerPage: 10
    }
  }

  handleChangePage = (event: unknown, newPage: number) => {
    this.setState({
      pageNumber: newPage
    })
  };

  handleChangeRowsPerPage = (event: any) => {
    this.setState({
      pageNumber: 0,
      rowsPerPage: +event.target.value
    })
  };

  render() {
    const {classes, schemaFields, history, onFilter} = this.props;
    const {rowsPerPage, pageNumber} = this.state;

    return (<Paper className={classes.container} elevation={0}>
      <Toolbar>
        <div className={classes.title}>
          <Tooltip
            title={`A tool to search and inspect datasets that are mapped to standardized metadata model and metadata elements of the models.`}>
            <InfoIcon/>
           </Tooltip>
          <Typography variant="h6" id="tableTitle">
            Data Explorer
          </Typography>
          <FilterBreadCrumbs/>
        </div>
        <div className={classes.spacer}/>
        <div>
          <FilterIcon onClick={onFilter}/>
          <Button
            variant={"outlined"}
            color={"secondary"}
            onClick={() => {Downloader.downloadFile('dataExplorer.json', schemaFields)}}
          >
            Download JSON
          </Button>
          <Button
            variant={"outlined"}
            color={"secondary"}
            onClick={() => {Downloader.downloadFileAsCSV('dataExplorer.csv', schemaFields)}}
          >
            Download CSV
          </Button>
        </div>
      </Toolbar>
      <Table className={"schema-field-table"}>
        <TableHead>
          <TableRow>
            <TableCell> <Typography>Table Name</Typography> </TableCell>
            <TableCell> <Typography>Field Name</Typography> </TableCell>
            <TableCell> <Typography>Description</Typography> </TableCell>
            <TableCell> <Typography>Dataset</Typography> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {schemaFields && schemaFields
          .slice(pageNumber * rowsPerPage, pageNumber * rowsPerPage + rowsPerPage)
          .map((schemaField,index) => (
            <TableRow key={`table-row${index}`}>
              <TableCell align="left">
                <Typography>{schemaField['object_name']}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{schemaField['field_name']}</Typography>
              </TableCell>
              <TableCell align="left">
                <Tooltip title={schemaField['field_description']}><Typography className={classes.description}>{schemaField['field_description']}</Typography></Tooltip>
              </TableCell>
              <TableCell align="left">
                <Typography
                  className={"link"}
                  onClick={() => history.push(`/dataset/${schemaField['dataset_id']}`)}>
                  {schemaField['dataset_name']}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={schemaFields.length}
        rowsPerPage={rowsPerPage}
        page={pageNumber}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    </Paper>
    )
  }
}

export default withStyles(styles)(SchemaFieldTable);
