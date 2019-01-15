
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Component } from 'react';

// @ts-ignore
const styles = theme => ({
    root: {
      width: 300,
      left: 400,
      backgroundColor: theme.palette.background.paper
    }
  });
type datasetNameType = {
    table_name: string;
};
interface DataListProps {
    datasetNames: datasetNameType [];
}
class DatasetList extends Component<DataListProps> {

render() {
        
    // @ts-ignore
    let listOfItems = this.props.datasetNames.map((item) => {
        return (
            <ListItem button>
                <ListItemText primary={item.table_name} />
            </ListItem>
        );
    });
    return <List component="nav">{listOfItems} </List>;
}
}
// @ts-ignore
export default withStyles(styles)(DatasetList);