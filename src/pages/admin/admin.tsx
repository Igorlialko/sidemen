import React, { useState } from 'react';

import { IStreamData, TSteps } from '../../types';
import { getStreamData } from '../../utils';
import { Header } from './Header';
import { Players } from './Players/Players';
import { Step1 } from './Step1/Step1';
import { Step2 } from './Step2/Step2';
import { TriggerActiveStep } from './TriggerActiveStep';
import s from './admin.module.scss';

export const AdminPage = () => {
  const initStreamData: IStreamData = JSON.parse(localStorage.getItem('streamData') || 'null');
  const [streamData, setStreamData] = useState<IStreamData>(getStreamData());
  const [_, rerender] = useState(false);

  const updateValues = () => {
    localStorage.setItem('streamData', JSON.stringify(streamData));
    rerender((prev) => !prev);
  };
  const clearAllDates = () => {
    localStorage.clear();
    window.location.reload();
  };

  const isDisableSave = initStreamData
    ? (() => {
        return JSON.stringify(initStreamData) === JSON.stringify(streamData);
      })()
    : false;
  console.log('initStreamData', initStreamData);
  console.log('streamData', streamData);
  return (
    <>
      <Header clearAllDates={clearAllDates} />
      <main>
        <section className='_container'>
          <TriggerActiveStep
            activePlayerId={streamData.activePlayerId}
            activeStep={streamData.activeStep}
            setActiveStep={(step: TSteps) => {
              setStreamData((prev: IStreamData) => ({
                ...prev,
                activeStep: step,
              }));
            }}
          />
          {streamData.activeStep === 'step2' && (
            <Step2
              activePlayer={streamData.players[streamData.activePlayerId]}
              setNextActivePlayerPosition={() => {
                setStreamData((prev) => ({
                  ...prev,
                  players: {
                    ...prev.players,
                    [streamData.activePlayerId]: {
                      ...prev.players[streamData.activePlayerId],
                      position: prev.players[streamData.activePlayerId].position + 1,
                    },
                  },
                }));
              }}
              setPrevActivePlayerPosition={() => {
                setStreamData((prev) => ({
                  ...prev,
                  players: {
                    ...prev.players,
                    [streamData.activePlayerId]: {
                      ...prev.players[streamData.activePlayerId],
                      position: prev.players[streamData.activePlayerId].position - 1,
                    },
                  },
                }));
              }}
              setNextExpertPosition={() => {
                setStreamData((prev) => ({
                  ...prev,
                  players: {
                    ...prev.players,
                    [streamData.activePlayerId]: {
                      ...prev.players[streamData.activePlayerId],
                      expertPosition: prev.players[streamData.activePlayerId].expertPosition + 1,
                    },
                  },
                }));
              }}
              setPrevExpertPosition={() => {
                setStreamData((prev) => ({
                  ...prev,
                  players: {
                    ...prev.players,
                    [streamData.activePlayerId]: {
                      ...prev.players[streamData.activePlayerId],
                      expertPosition: prev.players[streamData.activePlayerId].expertPosition - 1,
                    },
                  },
                }));
              }}
              setExpertGoldPrev={({ expertGoldPrev }) => {
                setStreamData((prev) => ({
                  ...prev,
                  players: {
                    ...prev.players,
                    [streamData.activePlayerId]: {
                      ...prev.players[streamData.activePlayerId],
                      expertGoldPrev,
                    },
                  },
                }));
              }}
              setExpertGoldNext={({ expertGoldNext }) => {
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
              }}
              setStartGold={({ startGold }) => {
                setStreamData((prev) => ({
                  ...prev,
                  players: {
                    ...prev.players,
                    [streamData.activePlayerId]: {
                      ...prev.players[streamData.activePlayerId],
                      startGold,
                    },
                  },
                }));
              }}
              setActiveGold={({ activeGold, position }) => {
                setStreamData((prev) => ({
                  ...prev,
                  players: {
                    ...prev.players,
                    [streamData.activePlayerId]: {
                      ...prev.players[streamData.activePlayerId],
                      activeGold,
                      position,
                    },
                  },
                }));
              }}
            />
          )}

          {streamData.activeStep === 'step1' && (
            <Step1
              activePlayer={streamData.players[streamData.activePlayerId]}
              setNextCount={() => {
                setStreamData((prev) => ({
                  ...prev,
                  players: {
                    ...prev.players,
                    [streamData.activePlayerId]: {
                      ...prev.players[streamData.activePlayerId],
                      points: prev.players[streamData.activePlayerId].points + 1,
                    },
                  },
                }));
              }}
              setPrevCount={() => {
                setStreamData((prev) => ({
                  ...prev,
                  players: {
                    ...prev.players,
                    [streamData.activePlayerId]: {
                      ...prev.players[streamData.activePlayerId],
                      points: prev.players[streamData.activePlayerId].points - 1,
                    },
                  },
                }));
              }}
              seconds={streamData.seconds}
              setSeconds={({ seconds }) => {
                setStreamData((prev) => ({
                  ...prev,
                  seconds,
                }));
              }}
              setStart={() => {
                setStreamData((prev) => ({
                  ...prev,
                  timerAction: 'start',
                }));
              }}
              setReset={() => {
                setStreamData((prev) => ({
                  ...prev,
                  timerAction: 'reset',
                }));
              }}
              setStop={() => {
                setStreamData((prev) => ({
                  ...prev,
                  timerAction: 'stop',
                }));
              }}
              timerAction={streamData.timerAction}
            />
          )}

          {(streamData.activeStep === 'pre_start' ||
            streamData.activeStep === 'start' ||
            streamData.activeStep === 'result') && (
            <Players
              initialPlayers={
                initStreamData
                  ? Object.values(initStreamData.players).map((el) => ({ id: el.id }))
                  : Object.values(streamData.players).map((el) => ({ id: el.id }))
              }
              playersValues={streamData.players}
              setPlayersValues={({ playerId, playerObj }) => {
                setStreamData((prev) => ({
                  ...prev,
                  players: {
                    ...prev.players,
                    [playerId]: playerObj,
                  },
                }));
              }}
              deletePlayersValues={({ playerId }) => {
                setStreamData((prev) => {
                  delete prev.players[playerId];
                  return prev;
                });
                rerender((prev) => !prev);
              }}
              setPlayerName={({ playerId, name }) => {
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
              }}
              activePlayerId={streamData.activePlayerId}
              setActivePlayerId={({ playerId }) => {
                setStreamData((prev) => ({
                  ...prev,
                  activePlayerId: playerId,
                }));
              }}
            />
          )}
          <button className={`button ${isDisableSave ? s.disable : ''}`} onClick={updateValues}>
            Save changes to game
          </button>
        </section>
      </main>
    </>
  );
};
