import * as React from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const SchemaList = ({schemas, onSchemaChange}) => {
  let handleChange = (value: any, props: any) => {
    //TODO: Each schema field needs an ID
    onSchemaChange(props.rowData.name, props.field, value);
  };

  let inputEditor = (props) => {
    return (
      <input
        value={props.rowData[props.field]}
        type="text"
        onChange={(e) => {handleChange(e.target.value, props)}}>
      </input>)
  };

  //TODO: Make name editable
  //TODO: Make types editable
  return(
    <div className={"schema-dt"}>
      <DataTable value={schemas} scrollable={true} scrollHeight="300px">
        <Column field="name" header="Name"/>
        <Column field="type" header="Type"/>
        <Column field="description" header="Description" editor={inputEditor} />
      </DataTable>
    </div>
  );
};

export default SchemaList;
