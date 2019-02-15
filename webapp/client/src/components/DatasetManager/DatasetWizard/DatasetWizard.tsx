import * as React from "react";
import DatasetStepper from './DatasetStepper';
import {WizardStep} from "./WizardStep";
import {Button, Grid} from "@material-ui/core";
import "./DatasetWizard.css";
import Typography from "@material-ui/core/Typography/Typography";

interface WizardProps {
  steps: WizardStep[],
  onNext: any;
  onPrev: any;
  currentStep: number;
}

interface WizardState {}

export class DatasetWizard extends React.Component<WizardProps, WizardState> {
  state: any;

  constructor(props: WizardProps) {
    super(props);
    this.state = {value: ''};
  }

  renderTitle(value: string) {
    if(!value) {
      return (<span>Next</span>);
    }
    return (<span>{value}</span>)
  }

  render() {
    return (
      <Grid container={true} justify={'center'}>
        <div className="wizard-wrapper">
          <Grid item xs={12}>
            <Typography variant="h6">Schema Information</Typography>
          </Grid>
          <DatasetStepper
            wizardSteps={this.props.steps}
            currentStep={this.props.currentStep}/>
            {(this.props.children as any).map((child, index, arr) => {
              if(index == this.props.currentStep) {
                return (arr[index])
              }
            })}
          <Grid container={true} justify={'flex-end'}>
            {this.props.currentStep != 0 &&
              <Button onClick={this.props.onPrev} variant="contained" color="primary" className={"wizard-button"}>
                Previous
              </Button>
             }
              <Button onClick={this.props.onNext} variant="contained" color="primary" className={"wizard-button"}>
                {this.renderTitle(this.props.steps[this.props.currentStep].nextButtonValue)}
              </Button>
          </Grid>
        </div>
      </Grid>
    )
  }
}
