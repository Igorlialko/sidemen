export type TSteps = 'pre_start' | 'start' | 'step1' | 'step2' | 'result';

export interface IPlayer {
  id: string | number;
  name: string;
  points: string;
  gold: string;
}

export interface IStreamData {
  activeStep: TSteps;
  activePlayerId: string | number;
  players: {
    [activePlayerId: string | number]: IPlayer;
  };
}
