import * as React from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "@material-ui/core";

const SchemaList = ({schemas, onSchemaSelect}) => {
  const dtHeader = () => {
    return (<div><Button>Add</Button></div>)
  };

  //TODO: Make name editable
  //TODO: Make types editable
  return(
    <div className={"schema-dt"}>
      <DataTable
        value={schemas}
        scrollable={true}
        paginator={true}
        header={dtHeader()}
        rows={5}
        selectionMode="single"
        onRowSelect={onSchemaSelect}
      >
        <Column field="name" header="Name" sortable={true}/>
        <Column field="type" header="Type" sortable={true}/>
        <Column field="description" header="Description" sortable={true}/>
      </DataTable>
    </div>
  );
};

export default SchemaList;
