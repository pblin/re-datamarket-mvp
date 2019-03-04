import * as React from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button, Dialog} from "@material-ui/core";

const SchemaList = ({schemas, onSchemaSelect}) => {
  const dtHeader = () => {
    return (<div><Button>Add</Button></div>)
  };
  console.log(dtHeader);

  const colTemplate = (rowData, column) => {
    console.log(rowData);
    console.log(column);
    return <p>{rowData[column.field]}</p>;
  };

  //TODO: Make name editable
  //TODO: Make types editable
  return(
    <div className={"schema-dt"}>
      <DataTable
        value={schemas}
        scrollable={true}
        scrollHeight={"300px"}
        selectionMode="single"
        onRowSelect={onSchemaSelect}
      >
        <Column field="name" header="Database Field Name" sortable={true} body={colTemplate}/>
        <Column field="label" header="Label" sortable={true} body={colTemplate}/>
        <Column field="type" header="Type" sortable={true} body={colTemplate}/>
        <Column field="description" header="Description" sortable={true} body={colTemplate}/>
      </DataTable>
      <Dialog open={false} fullWidth={true} maxWidth={"md"}> Test</Dialog>
    </div>
  );
};

export default SchemaList;
