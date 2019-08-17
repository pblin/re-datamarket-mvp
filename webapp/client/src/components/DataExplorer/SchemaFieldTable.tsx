import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";

import * as React from "react";
import FilterBreadCrumbs from "../Common/Filter/FilterBreadCrumbs";

//Icons
import FilterIcon from "@material-ui/icons/FilterList";

const styles = (theme: Theme) => ({
  container: {
    padding: '10px'
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


//TODO: Make the table responsive
//TODO: Download options
//TODO: Pagination
//TODO: Style
class SchemaFieldTable extends React.Component<ComponentProps> {
  render() {
    const {classes, schemaFields, history, onFilter} = this.props;

    console.log('THE SCHEMA FIEDS ARE');
    console.log(schemaFields);
    return (<Paper className={classes.container} elevation={0}>
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            Data Explorer <FilterBreadCrumbs/>
          </Typography>
        </div>
        <div className={classes.spacer}/>
        <div>
          <FilterIcon onClick={onFilter}/>
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
        {schemaFields && schemaFields.map((schemaField,index) => (
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
    </Paper>
    )
  }
}

export default withStyles(styles)(SchemaFieldTable);
