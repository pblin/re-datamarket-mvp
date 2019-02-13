import * as React from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const SchemaList = ({schemas, onSchemaChange}) => {
  let handleChange = (value: any, props: any) => {
    //TODO: Each schema field needs an ID
    onSchemaChange(props.rowData.name, props.field, value);
  };

  /*let validator = (props) => {
    console.log('validator');
    console.log(props);
    return false;
  };*/

  let inputEditor = (props) => {
    console.log('input editor');
    console.log(props);
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
    <div>
      <DataTable value={schemas} scrollable={true} scrollHeight="300px">
        <Column field="name" header="Name"/>
        <Column field="type" header="type"/>
        <Column field="description" header="Description" editor={inputEditor} />
      </DataTable>
    </div>
  );
};

export default SchemaList;
