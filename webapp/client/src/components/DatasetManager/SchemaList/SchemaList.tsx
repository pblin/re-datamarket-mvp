import * as React from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const SchemaList = ({schemas}) => {
  return(
    <div>
      SCHEMA LIST CONTAINER
      {console.log(schemas)}
      <DataTable value={schemas}>
        <Column field="name" header="Name"/>
        <Column field="type" header="type"/>
        <Column field="description" header="Description"/>
      </DataTable>
    </div>
  );
};

export default SchemaList;
