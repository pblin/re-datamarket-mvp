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
  Typography
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

const TypeMap = new Map();
TypeMap.set('integer', '123');
TypeMap.set('text', 'ABC');
TypeMap.set('boolean', 'bool');

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
      <Typography style={styles}>{schema.label}</Typography>
    )
  }

  renderTypeField(schema) {
    let content = '';

    if(TypeMap.has(schema.type)) {
      content = TypeMap.get(schema.type);
    }

    return (
      <Typography className={"type-field"}>{content || schema.type}</Typography>
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
              <TableCell> <Typography>Label</Typography> </TableCell>
              <TableCell> <Typography>Type</Typography> </TableCell>
              <TableCell> <Typography>Description</Typography> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.schemas.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(schema => (
              <TableRow>
                <TableCell align="left"><Typography className={"name-field"}>{schema.name}</Typography></TableCell>
                <TableCell align="left">{this.renderLabelField(schema)}</TableCell>
                <TableCell align="left">{this.renderTypeField(schema)}</TableCell>
                <TableCell align="left"><Typography>{schema.description}</Typography></TableCell>
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
