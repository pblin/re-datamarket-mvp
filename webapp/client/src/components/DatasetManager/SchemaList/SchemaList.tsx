import * as React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@material-ui/core";

const SchemaList = ({schemas, onSchemaSelect}) => {

  //TODO: Make name editable
  //TODO: Make types editable
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
          {schemas.map(schema => (
            <TableRow>
              <TableCell align="left"><Typography>{schema.name}</Typography></TableCell>
              <TableCell align="left"><Typography>{schema.label}</Typography></TableCell>
              <TableCell align="left"><Typography>{schema.type}</Typography></TableCell>
              <TableCell align="left"><Typography>{schema.description}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default SchemaList;
