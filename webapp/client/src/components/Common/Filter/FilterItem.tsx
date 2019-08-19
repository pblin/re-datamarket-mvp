import {
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Theme,
  Typography,
  withStyles
} from "@material-ui/core";
import * as React from "react";


const styles = (theme: Theme) => ({
   checkbox: {
     padding: '0 9px 0 9px',
   },
   control: {
     width: '100%'
   }
});

const FilterItem = ({title, options, selected, onSelect, objProp = "", classes}) => {
  return (
    <div>
      <FormControl>
        <FormLabel component={"legend"}>{title}</FormLabel>
        <FormGroup>
          <Collapse in={options && options.length > 0}>
            {options && options.map((option) => {
            return <FormControlLabel
                    className={classes.control}
                    control={<Checkbox
                    className={classes.checkbox}
                    checked={option[objProp] == selected}
                    onChange={() => onSelect(option)}
                    />}
                    label={`${option[objProp]}(${option.count})`}
                  />
            })}
          </Collapse>
          {!options && <Typography>No options available</Typography>}

        </FormGroup>
      </FormControl>
    </div>);
};

/*interface ComponentProps {
  title: string;
  options: any[];
  selected: string;
  onSelect: any;
  objProp: string;
}

class FilterItem extends React.Component<ComponentProps> {]
  render() {
    const {title, options, selected, onSelect, objProp} = this.props;
    return (
      <div>
        <FormControl>
          <FormLabel component={"legend"}>{title}</FormLabel>
          <FormGroup>
            {options.length > 0 && options.map((option) => {
              return <FormControlLabel
                control={<Checkbox
                  checked={option[objProp] == selected}
                  onChange={() => onSelect(option)}
                />}
                label={option[objProp]}
              />
            })}

          </FormGroup>
        </FormControl>
      </div>
    )
  }
}  */

export default withStyles(styles)(FilterItem);
