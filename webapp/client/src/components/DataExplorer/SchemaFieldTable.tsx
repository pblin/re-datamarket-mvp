import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";

import * as React from "react";

const SchemaFieldTable = ({schemaFields, history}) => {
  return (<Paper>
    <Table className={"schema-field-table"}>
      <TableHead>
        <TableRow>
          <TableCell> <Typography>Name</Typography> </TableCell>
          <TableCell> <Typography>Description</Typography> </TableCell>
          <TableCell> <Typography>Type</Typography> </TableCell>
          <TableCell> <Typography>Dataset</Typography> </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {schemaFields.map((schemaField,index) => (
          <TableRow key={`table-row${index}`}>
            <TableCell align="left">
              {schemaField['field_name']}
            </TableCell>
            <TableCell align="left">
              {schemaField['field_description']}
            </TableCell>
            <TableCell align="left">
              {schemaField['field_type']}
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
  </Paper>)
};

export default SchemaFieldTable;
