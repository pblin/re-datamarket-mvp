import * as React from "react";
import {Tabs, Tab} from "@material-ui/core";

const TabBar = ({}) => {
  return(
    <Tabs value={1} className={"tab-bar"} style={{height: "20px"}}>
      <Tab
        className={"tab"}
        label="tab1"
      >
      </Tab>
      <Tab
        className={"tab"}
        label="tab2"
      >
      </Tab>
    </Tabs>
  );
};

export default TabBar
