import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


function HorizontalStepper(props) {
  const { listLabel,activeStep, error } =props
  return (
      <Stepper activeStep={activeStep} alternativeLabel  style={{background:'none',padding:0,'& .MuiStep-completed':{color:'red !important' }}}>
        {listLabel.map((label, index) => (
          <Step key={label} >
            <StepLabel error={error}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    
  );
}
export default HorizontalStepper;