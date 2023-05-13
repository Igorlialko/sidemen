import React, { useEffect, useMemo } from 'react';

import { IStreamData } from '../../types';
import { Header } from './Header';
import { Players } from './Players/Players';
import { Step1 } from './Step1/Step1';
import { Step2 } from './Step2/Step2';
import { TriggerActiveStep } from './TriggerActiveStep';
import s from './admin.module.scss';
import { useStore } from './useStore';

export const AdminPage = () => {
  const initStreamData: IStreamData = JSON.parse(localStorage.getItem('streamData') || 'null');
  const {
    streamData,
    isRendered,
    updateValues,
    clearAllDates,
    setActiveStep,
    setNextActivePlayerPosition,
    setPrevActivePlayerPosition,
    setNextExpertPosition,
    setPrevExpertPosition,
    setExpertGoldPrev,
    setExpertGoldNext,
    setStartGold,
    setActiveGold,
    setNextCount,
    setPrevCount,
    setSeconds,
    setStop,
    setStart,
    setReset,
    setPlayersValues,
    deletePlayersValues,
    setPlayerName,
    setActivePlayerId,
  } = useStore();

  const isDisableSave = useMemo(() => {
    return initStreamData
      ? (() => {
          return JSON.stringify(initStreamData) === JSON.stringify(streamData);
        })()
      : false;
  }, [streamData, isRendered]);

  useEffect(() => {
    const addHotKeys = (event: KeyboardEvent) => {
      if (event.code === 'KeyS' && event.altKey) {
        updateValues();
      }
    };
    document.addEventListener('keydown', addHotKeys);
    return () => {
      document.removeEventListener('keydown', addHotKeys);
    };
  }, []);

  return (
    <>
      <Header clearAllDates={clearAllDates} />
      <main>
        <section className='_container'>
          <TriggerActiveStep
            activePlayerId={streamData.activePlayerId}
            activeStep={streamData.activeStep}
            setActiveStep={setActiveStep}
          />
          {streamData.activeStep === 'step2' && (
            <Step2
              activePlayer={streamData.players[streamData.activePlayerId]}
              setNextActivePlayerPosition={setNextActivePlayerPosition}
              setPrevActivePlayerPosition={setPrevActivePlayerPosition}
              setNextExpertPosition={setNextExpertPosition}
              setPrevExpertPosition={setPrevExpertPosition}
              setExpertGoldPrev={setExpertGoldPrev}
              setExpertGoldNext={setExpertGoldNext}
              setStartGold={setStartGold}
              setActiveGold={setActiveGold}
            />
          )}

          {streamData.activeStep === 'step1' && (
            <Step1
              activePlayer={streamData.players[streamData.activePlayerId]}
              setNextCount={setNextCount}
              setPrevCount={setPrevCount}
              seconds={streamData.seconds}
              setSeconds={setSeconds}
              setStart={setStart}
              setReset={setReset}
              setStop={setStop}
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
              setPlayersValues={setPlayersValues}
              deletePlayersValues={deletePlayersValues}
              setPlayerName={setPlayerName}
              activePlayerId={streamData.activePlayerId}
              setActivePlayerId={setActivePlayerId}
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
