import * as React from "react";
import MUIDataTable from "mui-datatables";

const options = {
  filterType: 'checkbox',
};

const SchemaList = ({schemas}) => {
  schemas = schemas.reduce((prev, current) => {
    prev.push([current.name, current.type, current.description]);
    return prev;
  }, []);
  return(
    <div>
      SCHEMA LIST CONTAINER
      {console.log(schemas)}
      <MUIDataTable
        title={"Schema List"}
        data={schemas}
        columns={["Name", "Type", "Description"]}
        options={options}
      />
    </div>
  );
};

export default SchemaList;
