import React from 'react';

import { TSteps } from '../../types';
import s from './trigger.module.scss';

const Steps: TSteps[] = ['pre_start', 'start', 'step1', 'step2', 'result'];

export const TriggerActiveStep = ({
  activeStep,
  setActiveStep,
  activePlayerId,
}: {
  activePlayerId: number | string;
  activeStep: TSteps;
  setActiveStep: (step: TSteps) => void;
}) => {
  return (
    <div className={s.trigger}>
      {Steps.map((step) => (
        <button
          onClick={() => {
            setActiveStep(step);
          }}
          className={`button ${step === activeStep ? 'active' : ''} ${
            !activePlayerId ? 'disabled' : ''
          }`}
          key={step}
        >
          {step}
        </button>
      ))}
    </div>
  );
};
