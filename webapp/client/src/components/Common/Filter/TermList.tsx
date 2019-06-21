import * as React from "react";
import {Chip, Paper, Typography} from "@material-ui/core";

const handleTermDelete = () => {

};

export const TermList = ({terms}) => {
  return (
    <Paper className={"term-list"}>
      {terms.length == 0 && <Typography variant={"subheading"}>No Search Terms Applied</Typography>}
      {terms.length > 0 && <Typography variant={"subheading"}>Terms</Typography>}
      {terms.map((term) =>
        <Chip
          label={`${term}`}
          variant={"outlined"}
          color={"primary"}
          className={"term-item"}
          onDelete={handleTermDelete}
        />
      )}
    </Paper>
  )
};
