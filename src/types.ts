export type TSteps = 'pre_start' | 'start' | 'step1' | 'step2' | 'result';
export type TTimerAction = 'start' | 'stop' | 'reset';
export type TActiveGold = 'startGold' | 'expertGoldPrev' | 'expertGoldNext' | 'wait';
export type TActivatedGold = 'startGold' | 'expertGoldPrev' | 'expertGoldNext';

export interface IPlayer {
  id: string | number;
  name: string;
  points: number;
  gold: number;
  expertPosition: number;
  position: number;
  startGold: number;
  expertGoldPrev: number;
  expertGoldNext: number;
  activeGold: TActiveGold;
}

export interface IStreamData {
  activeStep: TSteps;
  activePlayerId: string | number;
  seconds: number;
  timerAction: TTimerAction;
  players: {
    [activePlayerId: string | number]: IPlayer;
  };
}
