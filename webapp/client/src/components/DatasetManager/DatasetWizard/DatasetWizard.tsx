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

  render() {
    return (
      <div>
        <DatasetStepper
          wizardSteps={this.props.steps}
          currentStep={this.props.currentStep}/>
          {(this.props.children as any).map((child, index, arr) => {
            if(index == this.props.currentStep) {
              return (arr[index])
            }
          })}
        <button onClick={this.props.onPrev}>Previous</button>
        <button onClick={this.props.onNext} disabled={!this.props.steps[this.props.currentStep].completed}>Next</button>
      </div>
    )
  }
}
