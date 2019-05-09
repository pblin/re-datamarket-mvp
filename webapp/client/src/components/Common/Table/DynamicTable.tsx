import * as React from "react";
import {
  Grid,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography
} from "@material-ui/core";
import '../common.scss';
import Downloader from '../File/Downloader';

/**
 *
 * @param data
 * TODO
 * (1) Download JSON (Done)
 * (2) Download CSV (Done)
 * (3) Style
 * (4) Provide Dynamic Table On Dataset
 * (5) Only show table if the user is not the owner of the dataset
 * (6) Provide Sample Data Download
 */
const generateProps = (data) => {
  const dataProps = [];

  if(data.length) {
    for(const k in data[0]) {
      dataProps.push(k);
    }
  }

  return dataProps;
};

const renderTableCells = (row, objProps) => {
  return <TableRow>
    {objProps.map((prop) => (
      <TableCell>
        {row[prop] && row[prop].toString()}
      </TableCell>
    ))}
  </TableRow>;
};

const DynamicTable = ({data}) => {
  console.log('Here is the data passed');
  console.log(data);

  console.log(generateProps(data));

  const dataProps = Downloader.extractFieldsFromData(data);

  return(
    <Grid container={true} justify={"center"}>
      <button onClick={() => {Downloader.downloadFile('test.json', data)}}>Click Me</button>
      <button onClick={() => {Downloader.downloadFileAsCSV('test.csv', data)}}>Click Me CSV</button>
      Dynamic Table
      <Table className={"common-table"}>
        <TableHead>
          <TableRow>
            <TableCell>
                {dataProps.map((prop) => (
                  <TableCell><Typography>{prop}</Typography></TableCell>
                ))}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <React.Fragment>{renderTableCells(row, dataProps)}</React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

export default DynamicTable;
