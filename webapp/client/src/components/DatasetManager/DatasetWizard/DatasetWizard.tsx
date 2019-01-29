import * as React from "react";
import DatasetStepper from './DatasetStepper';
import {WizardStep} from "./WizardStep";

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

  goToStep() {

  }

  render() {
    return (
      <div>
        <DatasetStepper wizardSteps={this.props.steps} currentStep={this.props.currentStep}/> Form Wizard {this.props.children}
        <button onClick={this.props.onPrev}>Previous</button>
        <button onClick={this.props.onNext}>Next</button>
      </div>
    )
  }
}
