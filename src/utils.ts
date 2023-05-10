import { IStreamData } from './types';

export const getStreamData = (): IStreamData =>
  JSON.parse(localStorage.getItem('streamData') || 'null') || {
    activeStep: 'pre_start',
    players: {},
  };
