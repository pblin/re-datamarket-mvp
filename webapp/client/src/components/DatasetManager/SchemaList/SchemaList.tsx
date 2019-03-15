import * as React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TablePagination,
  Typography,
  Tooltip
} from "@material-ui/core";

interface SchemaProps {
  schemas: any[];
  onSchemaSelect: any;
}

interface SchemaState {
  page: number;
  rowsPerPage: number;
}

//TODO: Place in seperate file
const LabelMap = new Map();
LabelMap.set('integer', '#c4e2fb');
LabelMap.set('text', '#d2e9d0');
LabelMap.set('boolean', '#f8d7da');

export default class SchemaList extends React.Component<SchemaProps, SchemaState> {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  renderLabelField(schema) {
    let styles: any = {};

    if(LabelMap.has(schema.type)) {
      styles.backgroundColor = LabelMap.get(schema.type);
    }

    return (
      <Tooltip title={schema.name}>
        <Typography style={styles}>{schema.label}</Typography>
      </Tooltip>
    )
  }

  renderTypeField(schema) {
    return (
      <Typography className={"type-field"}>{schema.type}</Typography>
    )
  }

  handlePageChange(event, page) {
    this.setState({page});
  }

  handleChangeRowsPerPage(event) {
    this.setState({page: 0, rowsPerPage: event.target.value})
  }

  render() {
    return(
      <Paper className={"schema-dt"}>
        <Table className={"table"}>
          <TableHead>
            <TableRow>
              <TableCell> <Typography>Name</Typography> </TableCell>
              <TableCell> <Typography>Type</Typography> </TableCell>
              <TableCell> <Typography>Description</Typography> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.schemas.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(schema => (
              <TableRow>
                <TableCell align="left">{this.renderLabelField(schema)}</TableCell>
                <TableCell align="left">{this.renderTypeField(schema)}</TableCell>
                <TableCell align="left">
                  <Tooltip title={schema.description}><Typography className={"description-field"}>{schema.description}</Typography></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className={"table-footer"}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={this.props.schemas.length}
              onChangePage={this.handlePageChange}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              page={this.state.page}
              rowsPerPage={this.state.rowsPerPage}
            />
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}
