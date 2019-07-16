import * as React from "react";

import {
  Card,
  CardContent,
  Icon,
  Typography,
  withStyles
} from "@material-ui/core";
import AppVars from "../../../styles/appVars";
import {withRouter} from "react-router";

const styles = (theme) => ({
  navCard: {
    marginTop: 20,
    minWidth: 300,
    width: 300,
    marginRight: 10,
    '&:hover': {
      cursor: 'pointer',
      border: `1px solid ${AppVars.reblocOrange}`
    }
  },
  titleIcon: {
    fontSize: "10px",
    "& svg": {
      fontSize: 20,
      marginRight: 5,
      color: AppVars.lightGray
    }
  },
  title: {
    marginBottom: 5,
    display: 'inline-block',
    position: 'relative' as 'relative',
    bottom: '2px'
  },
  contentIconContainer: {
    height: 125
  },
  contentIcon: {
    marginLeft: 100,
    "& svg": {
      fontSize: "80px",
      marginTop: 20,
      color: AppVars.lightGray
    }
  },
  content: {
    color: AppVars.primaryLight
  }
});

const NavCard = ({title, TitleIcon, classes, content, ContentIcon, history, navTo}) => {
  console.log('HERE ARE THE STYLES');
  console.log(classes);
  return (
    <Card className={classes.navCard} onClick={() => history.push(navTo)}>
      <CardContent>
        <Icon classes={{root: classes.titleIcon}} fontSize={"inherit"}>{TitleIcon}</Icon>
        <div className={classes.title}>
          <Typography>
            <span>{title}</span>
          </Typography>
        </div>
        <div className={classes.contentIconContainer}>
          <Icon classes={{root: classes.contentIcon}} fontSize={"inherit"}>
            {ContentIcon}
          </Icon>
        </div>
        <Typography className={classes.content}>{content}</Typography>
      </CardContent>
    </Card>);
};

export default withRouter(withStyles(styles)(NavCard));
