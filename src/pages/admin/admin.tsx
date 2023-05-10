import React, { useState } from 'react';

import { IStreamData, TSteps } from '../../types';
import { getStreamData } from '../../utils';
import { Header } from './Header';
import { Players } from './Players/Players';
import { TriggerActiveStep } from './TriggerActiveStep';
import s from './admin.module.scss';

const initialId = Date.now();

export const AdminPage = () => {
  const initStreamData: IStreamData = JSON.parse(localStorage.getItem('streamData') || 'null');
  const [streamData, setStreamData] = useState<IStreamData>(getStreamData());

  const updateValues = () => {
    localStorage.setItem('streamData', JSON.stringify(streamData));
  };

  const isDisableSave = initStreamData
    ? (() => {
        return JSON.stringify(initStreamData) === JSON.stringify(streamData);
      })()
    : false;

  return (
    <>
      <Header />
      <main>
        <section className='_container'>
          <TriggerActiveStep
            activeStep={streamData.activeStep}
            setActiveStep={(step: TSteps) => {
              setStreamData((prev: IStreamData) => ({
                ...prev,
                activeStep: step,
              }));
            }}
          />
          <Players
            initialPlayers={
              initStreamData
                ? Object.values(initStreamData.players).map((el) => ({ id: el.id }))
                : [{ id: initialId }]
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
                console.log('prev 1', prev);
                delete prev.players[playerId];
                console.log('prev 2', prev);
                return prev;
              });
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
            setPlayerPoints={({ playerId, points }) => {
              setStreamData((prev) => ({
                ...prev,
                players: {
                  ...prev.players,
                  [playerId]: {
                    ...prev.players[playerId],
                    points,
                  },
                },
              }));
            }}
          />
          <button className={`button ${isDisableSave ? s.disable : ''}`} onClick={updateValues}>
            Save changes to game
          </button>
        </section>
      </main>
    </>
  );
};
