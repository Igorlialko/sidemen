import { IPlayer, IStreamData, TActivatedGold } from './types';

export const getStreamData = (): IStreamData =>
  JSON.parse(localStorage.getItem('streamData') || 'null') || {
    activeStep: 'pre_start',
    seconds: 60,
    players: {},
  };

export const getScore = (player: IPlayer) => {
  if (player.activeGold === 'startGold') {
    return player[player.activeGold as TActivatedGold] * player.points;
  }
  return player[player.activeGold as TActivatedGold];
};

export const getGold = (player: IPlayer) => {
  if (player.position !== 8) return 0;
  return getScore(player);
};
