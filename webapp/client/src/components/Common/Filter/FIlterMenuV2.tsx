import * as React from "react";
import {connect} from "react-redux";
import appVars from "../../../styles/appVars";

import {IconButton, InputBase, Paper, Theme} from "@material-ui/core";
import {
  Divider,
  Typography,
  withStyles
} from "@material-ui/core";

//Icons
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import SearchIcon from "@material-ui/icons/Search";
import ChipInput from "../Form/ChipInput";

interface ComponentProps {
  classes: any;
}

interface ComponentState {
  addTermInput: string;
}

const styles = (theme: Theme) => ({
  toolbar: {
    height: '85px',
    padding: "10px 0 0 0px",
    backgroundColor: appVars.reblocOrange,
    '& svg': {
      fontSize: '35px',
      color: appVars.reblocWhite
    }
  },
  toolbarIconContainer: {
    width: '40px',
    display: 'inline-block',
    float: 'left' as 'left',
    marginTop: '15px'
  },
  toolbarTitleContainer: {
    display: 'inline-block',
    marginTop: '10px'
  },
  title: {
    color: appVars.reblocWhite,
    fontSize: '18px'
  },
  subtitle: {
    color: appVars.lightGray,
    fontSize: '12px'
  }
});

export class FilterMenuV2 extends React.Component<ComponentProps, ComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      addTermInput: '',
    }
  }

  resetFilters = () => {
    //TODO: RESET THE FILTERS
  };

  onChipInputChange = (chips) => {
    console.log('new chips');
    console.log(chips);
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <div className={classes.toolbar}>
          <div className={classes.toolbarIconContainer}>
            <ChevronLeft/>
          </div>
          <div className={classes.toolbarTitleContainer}>
            <Typography variant={"h6"} className={classes.title}>
              ALL FILTERS
            </Typography>
            <Typography variant={"subtitle1"} className={classes.subtitle}>
              Use the filters below to find what you are looking for.
            </Typography>
          </div>
        </div>
        <Divider></Divider>
        <Paper elevation={2}>
          <InputBase
            placeholder={`Add Search Terms`}
            className={"filter-input"}
            onKeyPress={() => {}}
            value={this.state.addTermInput}
            onChange={(e) => this.setState({addTermInput: e.target.value})}
          />
          <IconButton onClick={() => {}}>
            <SearchIcon/>
          </IconButton>
        </Paper>
        <ChipInput onChange={this.onChipInputChange}/>
      </div>
    )
  }
}

//TODO: Make this into a container
const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterMenuV2));
