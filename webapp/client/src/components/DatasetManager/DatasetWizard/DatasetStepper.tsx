import * as React from "react";
import {Stepper, Step, StepLabel} from '@material-ui/core';
import {WizardStep} from "./WizardStep";

const DatasetStepper = ({wizardSteps, currentStep}) => {
    return(
      <Stepper activeStep={currentStep} className={"stepper"}>
        {wizardSteps.map( (wizardStep: WizardStep) => (<Step key={wizardStep.label} completed={wizardStep.completed}>
          <StepLabel>{wizardStep.label}</StepLabel>
        </Step>))}
      </Stepper>
    );
};

export default DatasetStepper;
