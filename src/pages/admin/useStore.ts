import { useMemo, useState } from 'react';

import { IPlayer, IStreamData, TActiveGold, TSteps } from '../../types';
import { getStreamData } from '../../utils';

export const useStore = () => {
  const [streamData, setStreamData] = useState<IStreamData>(getStreamData());
  const [isRendered, rerender] = useState(false);

  const setter = useMemo(
    () => ({
      updateValues: () => {
        setStreamData((prev) => {
          localStorage.setItem('streamData', JSON.stringify(prev));
          return prev;
        });
        setTimeout(() => {
          rerender((prev) => !prev);
        }, 0);
      },
      clearAllDates: () => {
        localStorage.clear();
        window.location.reload();
      },
      setActiveStep: (step: TSteps) => {
        setStreamData((prev: IStreamData) => ({
          ...prev,
          activeStep: step,
        }));
      },
      setNextActivePlayerPosition: () => {
        setStreamData((prev) => ({
          ...prev,
          players: {
            ...prev.players,
            [prev.activePlayerId]: {
              ...prev.players[prev.activePlayerId],
              position: prev.players[prev.activePlayerId].position + 1,
            },
          },
        }));
      },
      setPrevActivePlayerPosition: () => {
        setStreamData((prev) => ({
          ...prev,
          players: {
            ...prev.players,
            [prev.activePlayerId]: {
              ...prev.players[prev.activePlayerId],
              position: prev.players[prev.activePlayerId].position - 1,
            },
          },
        }));
      },
      setNextExpertPosition: () => {
        setStreamData((prev) => ({
          ...prev,
          players: {
            ...prev.players,
            [prev.activePlayerId]: {
              ...prev.players[prev.activePlayerId],
              expertPosition: prev.players[prev.activePlayerId].expertPosition + 1,
            },
          },
        }));
      },
      setPrevExpertPosition: () => {
        setStreamData((prev) => ({
          ...prev,
          players: {
            ...prev.players,
            [prev.activePlayerId]: {
              ...prev.players[prev.activePlayerId],
              expertPosition: prev.players[prev.activePlayerId].expertPosition - 1,
            },
          },
        }));
      },
      setExpertGoldPrev: ({ expertGoldPrev }: { expertGoldPrev: number }) => {
        setStreamData((prev) => ({
          ...prev,
          players: {
            ...prev.players,
            [prev.activePlayerId]: {
              ...prev.players[prev.activePlayerId],
              expertGoldPrev,
            },
          },
        }));
      },
      setExpertGoldNext: ({ expertGoldNext }: { expertGoldNext: number }) => {
        setStreamData((prev) => ({
          ...prev,
          players: {
            ...prev.players,
            [streamData.activePlayerId]: {
              ...prev.players[streamData.activePlayerId],
              expertGoldNext,
            },
          },
        }));
      },
      setStartGold: ({ startGold }: { startGold: number }) => {
        setStreamData((prev) => ({
          ...prev,
          players: {
            ...prev.players,
            [prev.activePlayerId]: {
              ...prev.players[prev.activePlayerId],
              startGold,
            },
          },
        }));
      },
      setActiveGold: ({ activeGold, position }: { activeGold: TActiveGold; position: number }) => {
        setStreamData((prev) => ({
          ...prev,
          players: {
            ...prev.players,
            [prev.activePlayerId]: {
              ...prev.players[prev.activePlayerId],
              activeGold,
              position,
            },
          },
        }));
      },
      setNextCount: () => {
        setStreamData((prev) => ({
          ...prev,
          players: {
            ...prev.players,
            [prev.activePlayerId]: {
              ...prev.players[prev.activePlayerId],
              points: prev.players[prev.activePlayerId].points + 1,
            },
          },
        }));
      },
      setPrevCount: () => {
        setStreamData((prev) => ({
          ...prev,
          players: {
            ...prev.players,
            [prev.activePlayerId]: {
              ...prev.players[prev.activePlayerId],
              points: prev.players[prev.activePlayerId].points - 1,
            },
          },
        }));
      },
      setSeconds: ({ seconds }: { seconds: number }) => {
        setStreamData((prev) => ({
          ...prev,
          seconds,
        }));
      },
      setStart: () => {
        setStreamData((prev) => ({
          ...prev,
          timerAction: 'start',
        }));
      },
      setReset: () => {
        setStreamData((prev) => ({
          ...prev,
          timerAction: 'reset',
        }));
      },
      setStop: () => {
        setStreamData((prev) => ({
          ...prev,
          timerAction: 'stop',
        }));
      },
      setPlayersValues: ({
        playerId,
        playerObj,
      }: {
        playerId: number | string;
        playerObj: IPlayer;
      }) => {
        setStreamData((prev) => ({
          ...prev,
          players: {
            ...prev.players,
            [playerId]: playerObj,
          },
        }));
      },
      deletePlayersValues: ({ playerId }: { playerId: number | string }) => {
        setStreamData((prev) => {
          delete prev.players[playerId];
          return prev;
        });
        rerender((prev) => !prev);
      },
      setPlayerName: ({ playerId, name }: { playerId: number | string; name: string }) => {
        setStreamData((prev) => ({
          ...prev,
          players: {
            ...prev.players,
            [playerId]: {
              ...prev.players[playerId],
              name,
            },
          },
        }));
      },
      setActivePlayerId: ({ playerId }: { playerId: number | string }) => {
        setStreamData((prev) => ({
          ...prev,
          activePlayerId: playerId,
        }));
      },
    }),
    []
  );

  return { streamData, isRendered, ...setter };
};
